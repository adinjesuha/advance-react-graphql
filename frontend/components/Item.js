import PropTypes from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'

import formatMoney from '../lib/formatMoney'
import DeleteItem from './DeleteItem'

const ItemCard = styled.div`
  width: calc(50% - 2rem);
  .card__image{
    overflow: hidden;
    img{
      width: 100%;
    }
  }
`

const Item = ({item}) => {
  return (
    <ItemCard>
      <div className="card__image">
        {item.image && <img src={item.image} alt={item.title}/>}
      </div>  
      <div>
        <Link href={{
          pathname: '/item',
          query: { id: item.id }
        }}>
          <a>{item.title}</a>
        </Link>
      </div>
      <p>{formatMoney(item.price)}</p>
      <p>{item.description}</p>
      <div className="buttonList">
        <Link href={{
          pathname: "update",
          query: { id: item.id }
        }}
        >
          <a>Edit</a>
        </Link>
        <button>Add to cart</button>
        <DeleteItem id={item.id}/>
      </div>
    </ItemCard>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
}

export default Item