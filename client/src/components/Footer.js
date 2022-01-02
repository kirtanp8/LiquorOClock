import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='links'>
        <a href='https://github.com/kirtanp8' target='_blank' rel='noreferrer'>
          <FaGithub className='icon-github' />
        </a>
        <div className='take-space-footer'></div>
        <p>Created by Kirtan Patel  </p>
        <div className='take-space-footer'></div>
        <a href='https://www.linkedin.com/in/kirtanp8/' target='_blank' rel='noreferrer'>
          <FaLinkedin className='icon-linkedin' />
        </a>
      </div>
    </div>
  )
}

export default Footer