import React from 'react'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AddReview from './AddReview'
import { Button } from 'react-bootstrap'
import SaveRecipe from './SaveRecipe'
import UnSaveRecipe from './UnSaveRecipe'
import { getToken } from '../helpers/auth'
import ReactStars from 'react-stars'
import { FaStar } from 'react-icons/fa'
import PrettyRating from 'pretty-rating-react';
  import {
  faHeart,
  faHeartBroken,
  faStar,
  faStarHalfAlt,
  faHeart as farHeart,
  faStar as farStar,
} from "@fortawesome/free-solid-svg-icons";



const CocktailShow = ({ isLoggedIn, isSaved, setIsSaved }) => {
  const [cocktail, setCocktail] = useState([])
  const [reviews, setReview] = useState([])
  const [addReviewShow, setAddReviewShow] = useState(false)
  const arrayOfRatings = []
  const handleAddReviewShow = () => setAddReviewShow(true)
  const handleAddReviewClose = () => setAddReviewShow(false)


  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    async function fetchCocktail() {
  
      const config = {
        method: 'get',
        url: `/api/recipes/${id}/`,
        headers: { 
          'Content-Type': 'application/json',
        }
      }
      const response = await axios(config)
      setCocktail(response.data)
      setReview(response.data.reviews)
    }
    fetchCocktail()
  }, [id])


  for (let i = 0; i < reviews.length; i++) {
    arrayOfRatings.push(parseFloat(reviews[i].star_rating))
  }

  console.log(arrayOfRatings)
  const arrAvg = arrayOfRatings.reduce((a,b) => a + b, 0) / arrayOfRatings.length

  const roundedAvg = Math.round(arrAvg / 0.5) * 0.5;




  return (
    <div>
      <img src={cocktail.picture} />
      <div className='title-description'></div>
      <h2>{cocktail.name}</h2>
      <div className=''>
        <p>Prep: {cocktail.prep_time}</p>
        <p>Difficulty: {cocktail.difficulty}</p>
        <p> Average Rating
        <ReactStars
        count={5}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
        value={roundedAvg}
        />
        </p>
      </div>
      <div>
        <p>{cocktail.description}</p>
      </div>
      <div className='save-recipe'>
        {isSaved?
          <UnSaveRecipe isSaved={isSaved} setIsSaved={setIsSaved} /> : <SaveRecipe isSaved={isSaved} setIsSaved={setIsSaved} />
        }  
      </div>
      <div>
        <p>Nutrition:</p>
          <div className='nutritional values'></div>
            <p>kcal</p>
            <p>{cocktail.kcal}</p>
          <div className='nutritional values'>
            <p>fat</p>
            <p>{cocktail.fat}</p>
          </div>
          <div className='nutritional values'>
            <p>saturates</p>
            <p>{cocktail.saturates}</p>
          </div>
          <div className='nutritional values'>
            <p>carbs</p>
            <p>{cocktail.carbs}</p>
          </div>
          <div className='nutritional values'>
            <p>sugars</p>
            <p>{cocktail.sugars}</p>
          </div>
          <div className='nutritional values'>
            <p>fibre</p>
            <p>{cocktail.fibre}</p>
          </div>
          <div className='nutritional values'>
            <p>protein</p>
            <p>{cocktail.protein}</p>
          </div>
          <div className='nutritional values'>
            <p>salt</p>
            <p>{cocktail.salt}</p>
          </div>
      </div>
      <div className='ingredients-method'>
        <div className='Ingredients'>
          <div>
            <h2>Ingredients</h2>
          </div>
          {cocktail.ingredients_one? 
            <div>
              
              <p>{cocktail.ingredients_one}</p>  
            </div>
              : <></>
          }
          {cocktail.ingredients_two? 
            <div>
               
              <p>{cocktail.ingredients_two}</p>  
            </div>
              : <></>
          }
          {cocktail.ingredients_three? 
            <div>
              
              <p>{cocktail.ingredients_three}</p>  
            </div>
              : <></>
          }
          {cocktail.ingredients_four? 
            <div>
              
              <p>{cocktail.ingredients_four}</p>  
            </div>
              : <></>
          }
          {cocktail.ingredients_five? 
            <div>
               
              <p>{cocktail.ingredients_five}</p>  
            </div>
              : <></>
          }

        </div>
        <div className='Method'>
          <div>
            <h2>Method</h2>
          </div>
          {cocktail.instructions_one? 
            <div>
              <h3>Step One</h3>
              <p>{cocktail.instructions_one}</p>  
            </div>
              : <></>
          }
          {cocktail.instructions_two? 
            <div>
              <h3>Step Two</h3>
              <p>{cocktail.instructions_two}</p>  
            </div>
              : <></>
          }
          {cocktail.instructions_three? 
            <div>
              <h3>Step Three</h3>
              <p>{cocktail.instructions_three}</p>  
            </div>
              : <></>
          }
          {cocktail.instructions_four? 
            <div>
              <h3>Step Four</h3>
              <p>{cocktail.instructions_four}</p>  
            </div>
              : <></>
          }
          {cocktail.instructions_five? 
            <div>
              <h3>Step Five</h3>
              <p>{cocktail.instructions_five}</p>  
            </div>
              : <></>
          }
          <div className="reviews-container-div">
            <h5>Reviews</h5>
            <div className="all-reviews">
              {reviews.map((review) => (
                review.text.length > 0 ? 
                  <div className="single-review" key={review.id}>
                    <div className="single-review-p">
                      <h4>{review.title}</h4>
                      <p>{review.owner.username}: {review.text}  {review.created}</p>
                    </div>
                  </div>
                  : <></>
              ))}
            </div>
          </div>
        </div>
        </div>
        <div>Add Review Here!</div>
        <Button onClick={handleAddReviewShow}></Button>
        <AddReview handleAddReviewClose={handleAddReviewClose} handleAddReviewShow={handleAddReviewShow} addReviewShow={addReviewShow}/>
      </div>
  )
}

export default CocktailShow
