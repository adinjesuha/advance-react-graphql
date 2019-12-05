import React, {useState} from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import formatMoney from '../lib/formatMoney'
import Form from './styles/Form'
import ErrorMesage from './ErrorMessage'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String! 
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ){
      id
    }
  }
`

const CreateItem = () => {
  const [item, setItem] = useState({
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  })

  const handleChange = e => {
    const {name, type, value} = e.target
    const val = type === 'number' ? parseFloat(value) : value
    setItem({
      ...item,
      [name]: val
    })
  }

  const uploadFile = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'ecommerce')
    const res = await fetch('https://api.cloudinary.com/v1_1/adinjesuha/image/upload', {
      method: 'POST',
      body: data
    })
    const file = await res.json()
    setItem({
      ...item,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    })
  }

  return (
    <Mutation
      mutation={CREATE_ITEM_MUTATION}
      variables={item}
    >
      {(createItem, {loading, error}) => (
        <Form onSubmit={ async e => {
          //stop the form from submitting
          e.preventDefault()
          //call the mutation
          const res = await createItem()
          //change them to the single item page
          Router.push({
            pathname: '/item',
            query: {
              id: res.data.createItem.id
            }
          })
        }}>
          <ErrorMesage error={error}/>

          <fieldset 
            disabled={loading} 
            aria-busy={loading}
          >
            <label htmlFor="file">
              Image
              <input 
                id="file" 
                type="file" 
                name="file" 
                placeholder="Upload an image" 
                onChange={uploadFile}
                required
              />
              {item.image && <img width="200" src={item.image} alt={item.title}/>}
            </label>
            <label htmlFor="title">
              Title
              <input 
                id="title" 
                type="text" 
                name="title" 
                placeholder="Title"
                value={item.title}
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
                value={item.price}
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
                value={item.description}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  )
}

export default CreateItem
export { CREATE_ITEM_MUTATION }