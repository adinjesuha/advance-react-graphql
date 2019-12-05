import Link from 'next/link'
import styled from 'styled-components'

import Navbar from './Navbar'

const Logo = styled.h1`
  font-size: 3rem;
  margin: 0;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a{
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1200px){
    margin: 0;
    text-align: center;
  }
`

const StyledHeader = styled.header`
  padding: 0 2rem;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  .bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>Sick Fits</a>
        </Link>
      </Logo>
      <Navbar />
    </div>
  </StyledHeader>
)

export default Header