import React from 'react'
import axios from 'axios'
import { getToken } from '../helpers/auth'
import { useState, useEffect } from 'react'
import { Card, Button, Fade } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CocktailCard from '../components/CocktailCard'
import { getUsername } from '../helpers/auth'
import { fetchAllCocktails } from '../helpers/api'

const Profile = () => {
  const usernameCollected = getUsername()
  const [user, setUser] = useState([])
  const [saved, setSaved] = useState([])
  const [cocktails, setCocktails] = useState([])
  let arrayOfUserCocktails = []

    useEffect(() => {
    fetchAllCocktails().then(setCocktails).catch(console.log("error"))
  }, [])

  useEffect(() => {
    async function fetchUserDetail() {
      const config = {
        method: 'get',
        url: '/api/auth/saved/',
        headers: { 
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      }

      const response = await axios(config)
      setUser(response.data)
      setSaved(response.data.saved)
    }
    fetchUserDetail()
  }, [])

  for (let i = 0; i < cocktails.length; i++) {
    if (cocktails[i].owner.username === usernameCollected) {
      arrayOfUserCocktails.push(cocktails[i])
    }
  }


  return (
    <div className='profile-page'>
  <h1 className='hello-message'>Hi {usernameCollected}</h1>
      <h3 className='profile-heading'>Your Saved Recipes</h3>
        <ul className="cocktail-list-profile">
        {saved.map((s) => (
          <li key={s.id}>
            <CocktailCard {...s} />
          </li>
        ))}
      </ul>
      <h3 className='profile-heading'>Your Recipes</h3>
      <ul className='added-list'>
      {arrayOfUserCocktails.map((cocktail) => (
      <li>
      <Card style={{ width: '18rem' }} className="shot-card">
        <Card.Img className="card-image" variant="top" src={cocktail.picture} 
          alt={cocktail.name} style={{ height: '100%', width: '50%' }}/>
        <Card.Body className="card-body">
          <Card.Title className="card-title">{cocktail.name}</Card.Title>
          <Card.Text className='description'>
            {cocktail.description}
          </Card.Text>
          {/* <Card.Text className="card-user">
            <p>Added by {user?.username}</p>
          </Card.Text> */}
          <div className='button-div'>
          <Button className="button">
            <Link className="link" to={`/cocktails/${cocktail.id}`}>See Reviews </Link>
          </Button>
          <Button className="button">
            <Link className="link" to={`/cocktails/${cocktail.id}/edit`}>Edit</Link>
          </Button>
          </div>
        </Card.Body>
      </Card>
      </li>
      ))}
      </ul>
    </div>
  )
}

export default Profile
