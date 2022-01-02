import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const CocktailCard = ({
  id,
  description, 
  potential_price, 
  name, 
  picture
}) => {
  return (
    <div>
      <Card style={{ width: '18rem' }} className="shot-card">
        <Card.Img className="card-image" variant="top" src={picture} 
          alt={name} style={{ height: '100%', width: '50%' }}/>
        <Card.Body className="card-body">
          <Card.Title className="card-title">{name}</Card.Title>
          <Card.Text className='description'>
            {description}
          </Card.Text>
          {/* <Card.Text className="card-user">
            <p>Added by {user?.username}</p>
          </Card.Text> */}
          <div className='button-div'>
          <Button className="button">
            <Link className="link" to={`/cocktails/${id}`}>Check Recipe</Link>
          </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CocktailCard
