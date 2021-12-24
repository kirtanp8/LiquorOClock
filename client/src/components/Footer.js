import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='links'>
        <p>Created by Kirtan Patel</p>
        <a href='https://www.linkedin.com/in/kirtanp8/' target='_blank' rel='noreferrer'>
          <FaLinkedin className='icon' />
        </a>
        <a href='https://github.com/kirtanp8' target='_blank' rel='noreferrer'>
          <FaGithub className='icon' />
        </a>
      </div>
      <p className='rights'>&copy; 2021 All rights reserved</p>
    </div>
  )
}

export default Footer