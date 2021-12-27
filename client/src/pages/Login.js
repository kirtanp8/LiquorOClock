import React from 'react'
import { useState } from 'react'
import { setToken, setUserId, setUsername } from '../helpers/auth'
import { useNavigate } from 'react-router'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { Link } from 'react-router-dom'

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

  return (
    <div className='form-page'>
      <div className='take-space-login'></div>
    <div className='form-container'>
      <div className='form-box'>
      <h2 className='login-title'>Login to SpiritsO'Clock</h2>
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Email" 
              type='email'
              name='email'
              value={data.email}
              onChange={handleFormChange} 
            />
            <Form.Label>Password</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control 
              placeholder="Password" 
              type='password'
              name='password' 
              value={data.password}
              onChange={handleFormChange}
            />
            </Form.Group>
          <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control className='submit' type="submit" value="Login" />
            </Form.Group>
          </div>        
          <div>
            <p className='sign-up-message'>Don't have an account? <Link to='/register' className='link'>Sign up here.</Link></p> 
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
    </div>
    </div>
  )
}

export default Login