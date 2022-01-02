import React from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET


export const ImageUploadFile = ({ handleImageUrl, value }) => {
  const handleUpload = async (event) => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    handleImageUrl(res.data.url)
  }

  return (
    <>
    <Form.Group controlId="formFile" className="mb-3">
      {value ? (
        <div className='image-field'>
          <Form.Control type="file" onChange={handleUpload} />
          <img src={value} alt='image' />
        </div>
      ) : (
        <div className='image-field'>
          <label>Image</label>
          <Form.Control type="file" onChange={handleUpload} />
        </div>
      )}
      </Form.Group>
    </>
  )
}

export default ImageUploadFile