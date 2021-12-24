import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { getToken } from './helpers/auth'
import { useEffect, useState } from 'react'
import Register from './pages/Register'
import { getUserId } from './helpers/auth'
import Home from './pages/Home'
import Footer from './components/Footer'
import CocktailList from './pages/CocktailList'
import CocktailShow from './pages/CocktailShow'
import AddReview from './pages/AddReview'
import AddRecipe from './pages/AddRecipe'
import Profile from './pages/Profile'
import EditRecipe from './pages/EditRecipe'

function App({ id }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
 

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])


  function ShowOneCocktail() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])
  
  return (
    <>
      <main>
        <CocktailShow isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      </main>
    </>
  )
}


  function UserLogIn(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      if (getToken()) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }, [])

    return (
      <Login {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    )
  }


  id = getUserId(id)
  console.log(id)

  return (
    <>
      <Router>
        <header className='header'>
        <nav>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </nav>
        </header>
        <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cocktails' element={<CocktailList />} />
          <Route path='/cocktails/:id' element={<ShowOneCocktail />} />
          <Route path='/login' element={<UserLogIn />} />
          <Route path='/register' element={<Register />}
           />
          <Route element={<NotFound />} />
          <Route path='/add_recipe' element={<AddRecipe />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cocktails/:id/edit' element={<EditRecipe />} />
        </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </>
  )
}

export default App