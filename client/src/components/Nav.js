import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { removeToken, removeUserId } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'
import Logo from '../pages/Logo'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarDataLoggedIn } from './SidebarDataLoggedIn'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons';


import Button from 'react-bootstrap/esm/Button'

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken() 
    removeUserId()
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <>
    <div className='nav-bar'>
      <Logo />
      <div className='title-logo'>
      </div>
      <nav className='nav-links-container'>
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
    <div className='hamburger-container'>
    <IconContext.Provider value={{ color: '#643754' }}>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='menu-bar-div'>
            <Link to='#' className='menu-bars'>
            <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {isLoggedIn? 
          SidebarDataLoggedIn.map((item, index) => { 
            return (
              index <= 3 ?
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <Button className='nav-button'>{item.title}</Button>
                </Link>
              </li>
              : 
              <li className={item.cName}>
                <Button className='nav-button' onClick={handleLogout}>Logout</Button>
              </li>
            )
          }          
          ) : SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                   <Button className='nav-button'>{item.title}</Button>
                </Link>
              </li>
            )
          } ) 
        }
        </ul>
      </div>
      </IconContext.Provider>
    </div>
    </>
  )
}

export default Nav