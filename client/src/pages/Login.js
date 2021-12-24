import React from 'react'
import { useState } from 'react'
import { setToken, setUserId, setUsername } from '../helpers/auth'
import { useNavigate } from 'react-router'
import Form from 'react-bootstrap/Form'
import FormInput from '../components/FormInput'
import axios from 'axios'


const Login = ({ setIsLoggedIn }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const config = {
      method: 'post',
      url: 'api/auth/login/',
      headers: { 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    
    try {
      const response = await axios(config).catch(handleError)
      console.log(response.data.token)
      setToken(response.data.token)
      setUserId(response.data.id)
      setUsername(response.data.username)
      navigate('/')
      setIsLoggedIn(true)
      setIsError(false)
      console.log(response.data.token)
      window.location.reload(false)
    } catch (err) {
      console.log(err)
      setIsError(true)
    }
  }

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
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

  const formInputProps = { data, errorInfo, handleFormChange }
  
  return (
    <div>
      <h1>Login to ShotsOclock</h1>
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <FormInput 
              placeholder="email" 
              type='email'
              name='email' 
              {...formInputProps} 
            />
            <FormInput 
              placeholder="password" 
              type='password'
              name='password' 
              {...formInputProps} 
            />
          <div>
            <Form.Control type="submit" value="Login" />
          </div>
          {isError ? (
            <div className='error'>
              <p>Error. Please try again.</p>
            </div> 
          ) : (
            <></>
          )}
        </Form.Group>
      </Form>
    </div>
  )
}

export default Login