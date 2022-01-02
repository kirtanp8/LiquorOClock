import React,  { useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { getToken } from '../helpers/auth'
import { Button } from 'react-bootstrap'

const SaveRecipe = () => {
  const { id } = useParams()
  const [isSaved, setIsSaved] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState({
    saved: id,
  })


  const handleSubmit = async (event) => {
    event.preventDefault()

    const config = {
      method: 'post', 
      url: `/api/recipes/${id}/`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,  
        'Content-Type': 'application/json',        
      },
      data,
    }
    try {
      const response = await axios(config)
      setIsError(false)
      setIsSaved(true)
      window.location.reload(false)
    } catch (err) {
      setIsError(true)
    }
    
  }

  return (
    <>
     <Button onSubmit={handleSubmit} onClick={handleSubmit}>SAVE</Button> 
    </>
  )
}

export default SaveRecipe
