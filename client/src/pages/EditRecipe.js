import React from 'react'
import { useParams, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from '../helpers/auth'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const EditRecipe = () => {

    const [data, setData] = useState({
    name: '',
    prep_time: '',
    difficulty: '',
    description: '',
    kcal: parseInt(''),
    fat: parseInt(''),
    saturates: parseInt(''),
    carbs: parseInt(''),
    sugars: parseInt(''),
    fibre: parseInt(''),
    protein: parseInt(''),
    salt: parseInt(''),
    ingredients_one: '',
    ingredients_two: '',
    ingredients_three: '',
    ingredients_four: '',
    ingredients_five: '',
    instructions_one: '',
    instructions_two: '',
    instructions_three: '',
    instructions_four: '',
    instructions_five: '',
    potential_price: parseInt(''),
  })

  const { id } = useParams()

  useEffect(() => {
  const getRecipe = async (id) => {
  const { name, prep_time, kcal, fat, saturates, carbs, sugars, fibre, protein, salt, description, ingredients, ingredients_two, ingredients_three, ingredients_four, ingredients_five, instructions_one, instructions_two, instructions_three, instructions_four, instructions_five, potential_price  } = (await axios.get(`/api/recipes/${id}/`)).data
      setData({ name, prep_time, kcal, fat, saturates, carbs, sugars, fibre, protein, salt, description, ingredients, ingredients_two, ingredients_three, ingredients_four, ingredients_five, instructions_one, instructions_two, instructions_three, instructions_four, instructions_five, potential_price })
    }
    getRecipe(id)
  }, [id])

  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

    const handleSubmit = async (event) => {
    event.preventDefault()
    
    const config = {
      method: 'put',
      url: `/api/recipes/${id}/`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,  
        'Content-Type': 'application/json',
      },
      data,
    }
    console.log(config)
    try {
      const response = await axios(config)
      console.log(response)
      navigate(`/recipes/${id}`)
      setIsError(false)
        
    } catch (err) {
      console.error(err)
      setIsError(true)    
    }
  }

    const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value, 
    })
  console.log(data)
  } 


  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name='name' value={data.name} placeholder="e.g. Mojito" onChange={handleFormChange} />
        </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Prep Time</Form.Label>
            <Form.Control type="text" name='prep_time' value={data.prep_time} placeholder="Prep Time" onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Difficulty</Form.Label>
            <Form.Control type="text" name='difficulty' value={data.difficulty} placeholder="Description" onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name='description' value={data.description} placeholder="Description" onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>kcal</Form.Label>
            <Form.Control type='number' min='0' max='1000' name='kcal' value={parseInt(data.kcal)}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>fat</Form.Label>
            <Form.Control type='number' min='0' max='1000' name='fat' value={parseInt(data.fat)}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>saturates</Form.Label>
            <Form.Control type='number' min='0' max='1000' name='saturates' value={parseInt(data.saturates)}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>carbs</Form.Label>
            <Form.Control type='number' min='0' max='1000' name='carbs' value={parseInt(data.carbs)}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>sugars</Form.Label>
            <Form.Control type='number' min='0' max='1000' name='sugars' value={parseInt(data.sugars)}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>fibre</Form.Label>
            <Form.Control type='number' min='0' max='1000' name='fibre' value={parseInt(data.fibre)}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>protein</Form.Label>
            <Form.Control type='number' min='0' max='1000' name='protein' value={parseInt(data.protein)}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>protein</Form.Label>
            <Form.Control type='number' min='0' max='1000' name='protein' value={parseInt(data.protein)}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>salt</Form.Label>
            <Form.Control type='number' min='0' max='1000' name='salt' value={parseInt(data.salt)}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Ingredients 1</Form.Label>
            <Form.Control type='text' name='ingredients_one' value={data.ingredients_one}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Ingredients 2</Form.Label>
            <Form.Control type='text'  name='ingredients_two' value={data.ingredients_two}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Ingredients 3</Form.Label>
            <Form.Control type='text' name='ingredients_three' value={data.ingredients_three}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Ingredients 4</Form.Label>
            <Form.Control type='text' name='ingredients_four' value={data.ingredients_four}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Ingredients 5</Form.Label>
            <Form.Control type='text' name='ingredients_five' value={data.ingredients_five}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Step One</Form.Label>
            <Form.Control as="textarea" name='instructions_one' value={data.instructions_one}  placeholder='Pour in the Kahlúa' type='text' onChange={handleFormChange} />
          </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Step 2</Form.Label>
            <Form.Control as="textarea" name='instructions_two' value={data.instructions_two}  placeholder='optional extra instruction' type='text' onChange={handleFormChange} />
          </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Step 3</Form.Label>
            <Form.Control as="textarea" name='instructions_three' value={data.instructions_three}  placeholder='optional extra instruction' type='text' onChange={handleFormChange} />
          </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Step 4</Form.Label>
            <Form.Control as="textarea" name='instructions_four' value={data.instructions_four}  placeholder='optional extra instruction' type='text' onChange={handleFormChange} />
          </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Step 5</Form.Label>
            <Form.Control as="textarea" name='instructions_five' value={data.instructions_five}  placeholder='optional extra instruction' type='text' onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Potential Cost</Form.Label>
            <Form.Control type='number' min='1.00' max='500.00' name='potential_price' value={parseInt(data.potential_price)}  placeholder='potential cost' onChange={handleFormChange} />
          </Form.Group>
            <div className='bottom-of-form'>
              <div className='required-section'>
                {isError ? (
                  <>
                    <p className='error'>Please try again. Required field may not have been filled in</p>
                  </>
                ) : (
                  <></>
                )}
                <button variant="primary" type="submit">
                  SUBMIT
                </button>
                <Button className="button" onClick={() => navigate(-1)}>Go Back</Button>
              </div>
            </div>
        </Form>    
    </div>
  )
}

export default EditRecipe
