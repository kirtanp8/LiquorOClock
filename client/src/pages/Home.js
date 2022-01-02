import React from 'react'
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <div className='home-page'>
    <Fade left cascade>
    <div className='opening'>
      <h1>Welcome to SpiritsO'Clock</h1>
      <h5>The Home for Sharing your favourite Cocktail Recipes and finding new ones</h5>
      <p>Please <Link to='/login' className='links'>log in</Link> or <Link to='/register' className='links'>register</Link> to view all features mentioned</p>
    </div>
    </Fade>
    <div className='home-page-image'>
      <Fade right>
      <img src='https://cdn.pixabay.com/photo/2016/03/31/23/14/caribbean-1297486_960_720.png' />
      </Fade>
    </div>
    </div>
    </>
  )
}

export default Home
