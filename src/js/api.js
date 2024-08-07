const API_KEY = "4ffb1f9c";
const URL_ENDPOINT = `https://www.omdbapi.com/`;

/** 

* function for searching movie
@param {query} - for the movie, for example title
@param {param} - parameter that specifies how to search for the movie s = Search i = Title
*   or you want have more details about a specific movie 
     http://www.omdbapi.com/?i=imdbID&apikey=4ffb1f9c
**/

export async function getMovies(query, param = "s") {
  if (param === "detail") param = "i";

  const request = await fetch(
    `${URL_ENDPOINT}?${param}=${query}&apikey=${API_KEY}`,
  );
  const response = await request.json();

  return response;
}

/** 

* function for filtering
@param {collection} - collection of movies 
@param {filterByType} - type of search we want Movie, Serie, Episode   
**/
export function filter(collection, filterByType = "movie") {
  return collection.filter((data) => {
    return data.Type === filterByType;
  });
}
