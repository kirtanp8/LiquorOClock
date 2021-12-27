import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { getToken } from '../helpers/auth.js'
import { Button, Modal } from 'react-bootstrap'
import { useParams } from 'react-router'
import ReactStars from 'react-stars'

const AddReview = ({  addReviewShow, handleAddReviewClose }) => {
  const [isError, setIsError] = useState(false)

  const { id } = useParams()

  const [data, setData] = useState({
      title: '',
      text: '',
      star_rating: '',
      recipe: id
  })


  const handleRating = (value) => {
    setData({ ...data, star_rating: value })
    console.log(value)
  }

  console.log(getToken())


  const handleSubmit = async (event) => {
    event.preventDefault()

    const config = {
      method: 'post',
      url: '/api/reviews/',
      headers: { 
        'Authorization': `Bearer ${getToken()}`, 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    
    try {
      const response = await axios(config)
      console.log(response)
      setIsError(false)
      setData('')
    } catch (err) {
      console.log(err)
      setIsError(true)    
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setData({ 
      ...data, 
      [name]: value,
     })
     console.log(data)
  }

 
  return (
    <div>
      <Modal
        show={addReviewShow}
        onHide={handleAddReviewClose}
      >
      <Modal.Dialog className='modal-form'>
        <Modal.Header className='header' closeButton>
          <Modal.Title id="modal-title">Post Your Review</Modal.Title>
                      <Form.Group>
              <Form.Label className='stars'>
                <div>
                    <ReactStars
                      name="star_rating"
                      type="number"
                      count={5}
                      onChange={handleRating}
                      size={30}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                      value={data.star_rating}
                    />
                </div>
              </Form.Label>
            </Form.Group>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
                <Form.Label className='form-title'>Title</Form.Label>
                <Form.Control className='title-section' onChange={handleChange} value={data.title} type='text'
                name='title'
                as='textarea' style={{ height: '10%' }} placeholder='Review Title' />
            </Form.Group>
            <Form.Group>
              <Form.Label className='form-title'>Review</Form.Label>
              <Form.Control onChange={handleChange} value={data.text} type='text'
              name='text' as='textarea' style={{ height: '200px' }} placeholder='Post Your Review Here' />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className='review-button' value='post' type='submit'>Save changes</Button>
        </Modal.Footer>
        </Form>
      </Modal.Dialog>
      </Modal>
    </div>
  )
}

export default AddReview
