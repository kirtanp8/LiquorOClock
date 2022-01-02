import React from 'react'
import { useEffect, useState } from 'react'
import { fetchAllCocktails } from '../helpers/api'
import CocktailCard from '../components/CocktailCard'

const CocktailList = () => {
  const [cocktails, setCocktails] = useState([])

    useEffect(() => {
    fetchAllCocktails().then(setCocktails).catch(console.log("error"))
  }, [])

  return (
    <div className="cocktail-list-div">
      <ul className="cocktail-list">
        {cocktails.map((s) => (
          <li key={s.id}>
            <CocktailCard {...s} />
          </li>
        ))} 
      </ul>
    </div>
  )
}

export default CocktailList
