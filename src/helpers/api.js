import axios from "axios"

export const fetchAllCocktails = async () => {
  const config = {
    method: 'get',
    url: '/api/recipes',
    headers: {}
  }
  const response = await axios(config)
  return response.data
}
