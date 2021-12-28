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
            <Button className='nav-button'><Link className='link' to='/'>Home</Link></Button>
          </li>
          {isLoggedIn ? (
            <>
            <li>
              <Button className='nav-button'><Link className='link' to='/profile'>Profile</Link></Button>
            </li>
            <li>
            <Button className='nav-button'><Link className='link' to='/cocktails'>Gallery</Link></Button>
          </li>
             <li>
              <Button className='nav-button'><Link className='link' to='/add_recipe'>Share</Link></Button>
              </li>
              <li>
                <Button className='nav-button' onClick={handleLogout}>Logout</Button>
              </li>
              
            </>
          ) : ( 
            <>
              <li>
                <Button className='nav-button'><Link className='link' to='/login'>Login</Link></Button>
              </li>
              <li>
                <Button className='nav-button'><Link className='link' to='/register'>Register</Link></Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Nav