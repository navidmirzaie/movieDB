const API_KEY = `4ffb1f9c`;
const URL_ENDPOINT = `https://www.omdbapi.com/`;

/** 

* function for searching movie
@param {query} - for the movie, for example title
@param {param} - parameter that specifies how to search for the 
                       movie s = Search i = Title
*  for example if you want to search for movies in general: 
    http://www.omdbapi.com/?s=Inception&apikey=4ffb1f9c

*   or you want have more details about a specific movie 
     http://www.omdbapi.com/?i=imdbID&apikey=4ffb1f9c
**/

export function getData(query, param = "s") {
  if (param === "detail") {
    param = "i";
  }

  //todo: remove console.log
  console.log(`${URL_ENDPOINT}?${param}=${query}&apikey=${API_KEY}`);

  const request = fetch(
    `${URL_ENDPOINT}?${param}=${query}&apikey=${API_KEY}`
  ).then((response) => response.json());

  return request;
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
