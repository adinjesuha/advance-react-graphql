import React  from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Item from './Item'
import Pagination from './Pagination'
import {perPage} from '../config'

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`

const Center = styled.div`
  margin: 0 auto;
  text-align: center;
`

const ItemList = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Items = ({page}) => {
  return (
    <Center>
      <Pagination page={page}/>
        <Query 
          query={ALL_ITEMS_QUERY} 
          // fetchPolicy="network-only"
          variables={{
            skip: page * perPage - perPage,
          }}
        >
          {({data, error, loading}) => {
            if(loading) return <p>Loading...</p>
            if(error) return <p>{error.message}</p>
            return (
              <ItemList> 
                {data.items.map(item => <Item item={item} key={item.id}/>)}
              </ItemList>
            )
          }}
        </Query>
      <Pagination page={page}/>
    </Center>
  )
}
 
export default Items
export { ALL_ITEMS_QUERY }