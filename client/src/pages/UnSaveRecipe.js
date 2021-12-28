import React from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router'
import { getToken } from '../helpers/auth'
import axios from 'axios'
import { useState } from 'react'

const UnSaveRecipe = ({ setIsSaved }) => {
  const { id } = useParams()

    const [isError, setIsError] = useState(false)

    const handleSubmit = async (event) => {
    event.preventDefault()

    const config = {
      method: 'put', 
      url: `/api/auth/saved/${id}/`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,  
        'Content-Type': 'application/json',        
      },
    }
    try {
      const response = await axios(config)
      console.log(response.data)
      setIsError(false)
      window.location.reload(false)
    } catch (err) {
      console.error(err)
      setIsError(true)
    }
    
  }


  return (
    <>
      <Button onSubmit={handleSubmit} onClick={handleSubmit}>Unsave</Button>
    </>
  )
}

export default UnSaveRecipe
