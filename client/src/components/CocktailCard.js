import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from '@restart/ui/esm/Button'
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
          <Card.Text className="card-text">
            £{potential_price}
          </Card.Text>
          <Card.Text>
            {description}
          </Card.Text>
          {/* <Card.Text className="card-user">
            <p>Added by {user?.username}</p>
          </Card.Text> */}
          <Button className="button">
            <Link className="link" to={`/cocktails/${id}`}>Check Recipe</Link>
          </Button>
          <Button className="button">
            <Link className="link" to={`/cocktails/${id}/rating`}>Add a Review</Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CocktailCard
