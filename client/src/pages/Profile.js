import React from 'react'
import axios from 'axios'
import { getToken } from '../helpers/auth'
import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CocktailCard from '../components/CocktailCard'
import { getUsername } from '../helpers/auth'
import { fetchAllCocktails } from '../helpers/api'

const Profile = () => {


  const usernameCollected = getUsername()

  console.log(usernameCollected)

  const [user, setUser] = useState([])
  const [saved, setSaved] = useState([])

  const [cocktails, setCocktails] = useState([])

  let arrayOfUserCocktails = []

    useEffect(() => {
    fetchAllCocktails().then(setCocktails).catch(console.log("error"))
  }, [])



  console.log(cocktails)


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

  console.log(arrayOfUserCocktails)

  return (
    <>
      <div className='profile-section'>
        <h6>Hi! {user.first_name}</h6>
        <img src={user.image} />
      </div>
      <h6>Please see your saved Recipes Below</h6>
        <ul className="cocktail-list">
        {saved.map((s) => (
          <li key={s.id}>
            <CocktailCard {...s} />
          </li>
        ))}
      </ul>
      <h6>Please see the Recipes you added below</h6>
      <ul>
      {arrayOfUserCocktails.map((cocktail) => (
      <li>
      <Card style={{ width: '18rem' }} className="shot-card">
        <Card.Img className="card-image" variant="top" src={cocktail.picture} 
          alt={cocktail.name} style={{ height: '100%', width: '50%' }}/>
        <Card.Body className="card-body">
          <Card.Title className="card-title">{cocktail.name}</Card.Title>
          <Card.Text className="card-text">
            £{cocktail.potential_price}
          </Card.Text>
          <Card.Text>
            {cocktail.description}
          </Card.Text>
          {/* <Card.Text className="card-user">
            <p>Added by {user?.username}</p>
          </Card.Text> */}
          <Button variant='warning' className="button">
            <Link className="link" to={`/cocktails/${cocktail.id}`}>See Reviews </Link>
          </Button>
          <Button variant='warning' className="button">
            <Link className="link" to={`/cocktails/${cocktail.id}/edit`}>Edit</Link>
          </Button>
        </Card.Body>
      </Card>
      </li>
      ))}
      </ul>
    </>
  )
}

export default Profile
