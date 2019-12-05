import Link from 'next/link'
import styled from 'styled-components'

const NavLinks = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  a, button{
    font-size: 1.4rem;
    padding: 1rem 1.3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    background: none;
    border: 0;
    cursor: pointer;
    &:last-child{
      padding-right: 0;
    }
    &:hover,
    &:focus {
      outline: none;
    }
  }
`

const Navbar = () => (
  <NavLinks>
    <Link href="/items">
      <a>Shop</a>
    </Link>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/signup">
      <a>SignUp</a>
    </Link>
    <Link href="/orders">
      <a>Orders</a>
    </Link>
    <Link href="/account">
      <a>Account</a>
    </Link>
  </NavLinks>
)

export default Navbar