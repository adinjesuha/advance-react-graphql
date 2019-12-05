import React, {useState} from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import formatMoney from '../lib/formatMoney'
import Form from './styles/Form'
import ErrorMesage from './ErrorMessage'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }){
      id
      title
      description
      price
    }
  }
`

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ){
      id
      title
      description
      price
    }
  }
`

const UpdateItem = ({id}) => {
  const [item, setItem] = useState({})

  const handleChange = e => {
    const {name, type, value} = e.target
    const val = type === 'number' ? parseFloat(value) : value
    setItem({
      ...item,
      [name]: val
    })
  }

  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
      {({data, loading}) => {
        if(loading) return <p>Loading...</p>
        return (
          <Mutation
            mutation={UPDATE_ITEM_MUTATION}
            variables={item}
          >
            {(updateItem, {loading, error}) => (
              <Form onSubmit={ async e => {
                //stop the form from submitting
                e.preventDefault()
                //call the mutation
                const res = await updateItem({
                  variables: {
                    ...item, 
                    id
                  }
                })
                console.log('updated')
              }}>
                <ErrorMesage error={error}/>
                <fieldset 
                  disabled={loading} 
                  aria-busy={loading}
                >
                  <label htmlFor="title">
                    Title
                    <input 
                      id="title" 
                      type="text" 
                      name="title" 
                      placeholder="Title"
                      defaultValue={data.item.title}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label htmlFor="price">
                    Price
                    <input 
                      id="price" 
                      type="number" 
                      name="price" 
                      placeholder="Price" 
                      defaultValue={data.item.price}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label htmlFor="description">
                    Description
                    <textarea 
                      id="description" 
                      name="description" 
                      placeholder="Description" 
                      defaultValue={data.item.description}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <button type="submit">Sav{loading ? 'ing' : 'e'} changes</button>
                </fieldset>
              </Form>
            )}
          </Mutation>
        )
      }}
    </Query>
  )
}

export default UpdateItem
export { UPDATE_ITEM_MUTATION, SINGLE_ITEM_QUERY }