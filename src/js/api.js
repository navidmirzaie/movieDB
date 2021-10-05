'use strict';

const API_KEY       = `4ffb1f9c`;
const URL_ENDPOINT  = `http://www.omdbapi.com/`;

export function searchMovie(query) {
    const request = fetch(`${URL_ENDPOINT}?s=${query}&apikey=${API_KEY}`)
    .then(response => response.json());
    
    return request;
    
}