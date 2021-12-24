import React from 'react'
import { Link } from 'react-router-dom'
import { removeToken, removeUserId } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'
import Logo from '../pages/Logo'

import Button from 'react-bootstrap/esm/Button'

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken() 
    removeUserId()
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <div className='nav-bar'>
      <Logo />
      <div className='title-logo'>
      </div>
      <nav>
        <ul>
          <li>
            <Button variant="warning"><Link to='/'>Home</Link></Button>
          </li>
          <li>
            <Button variant="warning"><Link to='/cocktails'>Cocktails</Link></Button>
          </li>
          {isLoggedIn ? (
            <>
            <li>
              <Button variant="warning"><Link to='/profile'>Profile</Link></Button>
            </li>
             <li>
              <Button variant="warning"><Link to='/add_recipe'>Add Recipe</Link></Button>
              </li>
              <li>
                <Button variant="warning" onClick={handleLogout}>Logout</Button>
              </li>
              
            </>
          ) : ( 
            <>
              <li>
                <Button variant="warning"><Link to='/login'>Login</Link></Button>
              </li>
              <li>
                <Button variant="warning"><Link to='/register'>Register</Link></Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Nav