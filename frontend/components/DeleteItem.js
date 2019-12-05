import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ALL_ITEMS_QUERY } from './Items'

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id){
      id
    }
  }
`

const DeleteItem = ({id}) => {
  const update = (cache, payload) =>{
    const data = cache.readQuery({query: ALL_ITEMS_QUERY})
    console.log(data, payload)
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id)
    cache.writeQuery({query: ALL_ITEMS_QUERY, data})
  }
  return (
    <Mutation 
      mutation={DELETE_ITEM_MUTATION} 
      variables={{id}}
      update={update}
    >
      {(deleteItem, { error }) => (
        <button onClick={() => {
          if(confirm('Are you sure ou wanted delete this?')) {
            deleteItem();
          }
        }}>Delete Item</button>
      )}
    </Mutation>
  )
}

export default DeleteItem