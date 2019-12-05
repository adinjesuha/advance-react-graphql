import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import Head from 'next/head'

import ErrorMessage from './ErrorMessage'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!){
    item(where: { id:  $id }){
      id
      title
      description
      largeImage
    }
  }
`
const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: flex;
  min-height: 800px;
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details{
    margin: 3rem;
    font-size: 2rem;
  }
`

const SingleItem = ({id}) => {
  return (
    <Query 
      query={SINGLE_ITEM_QUERY} 
      variables={{id}}
    >
      {({error, loading, data}) => {
        if(error) return <ErrorMessage error={error}/>
        if(loading) return <p>Loading...</p>
        if(!data.item) return <p>Not Item found for {id}</p>
        console.log(data)
        const {largeImage, description, title} = data.item
        return(
          <SingleItemStyles>
            <Head>
              <title>Sick Fits | {title}</title>
            </Head>
            <img src={largeImage} alt={description} />
            <div className="details">
              <h2>Viewing {title}</h2>
              <p>{description}</p>
            </div> 
          </SingleItemStyles>
        )
      }}
    </Query>
  ) 
}

export default SingleItem