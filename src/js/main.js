'use strict';

import { filter, getMovie } from './api';

import '../css/default.css';
import Movie from './Movie';

// MOVIE SELECTOR(S)
const MOVIE_CONTAINER = document.querySelector('.movies-wrapper');

// SEARCH SELECTORS
const SEARCH_BAR = document.querySelector('#searchbar');
const SEARCH_BUTTON = document.querySelector("#search");

// MODAL SELECTORS
const MODAL_WINDOW = document.querySelector('.modal-window');
const MODAL_CONTENT = document.querySelector('.modal-window .modal-content');
const CLOSE_MODAL_BUTTON = document.querySelector('.modal-window .close');

function initApp() {

  //bind events  
  SEARCH_BUTTON.addEventListener('click', search);
  SEARCH_BAR.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        search(event);
    }
  });

  //close modal by click escape
  MODAL_CONTENT.addEventListener('keyup', function(event) {
      if(event.keyCode === 27) {
        event.preventDefault();
        closeModal();
      }
  })

  //close modal
  CLOSE_MODAL_BUTTON.addEventListener('click', (event)=> {
    closeModal();
  })
}

function openModal() {
    MODAL_WINDOW.classList.remove('close-modal');
    MODAL_WINDOW.classList.add('open-modal');
    MODAL_CONTENT.focus();
}

function closeModal() {
    MODAL_WINDOW.classList.add('close-modal');
    MODAL_WINDOW.classList.remove('open-modal');
}

async function search(event) {
    event.preventDefault();
    let query = SEARCH_BAR.value;
    const results = await getMovie(query, "search");

    try {
        renderListOfMovies(results.Search);
    } catch(error) {
        MOVIE_CONTAINER.innerHTML = `<strong>${results.Error} try typing the correct title</strong>`
    }
}

function renderListOfMovies(list) {
    let html = ``;
    let movie = null;
    
    //show only movies 
    const movies = filter(list, 'movie');

    for(let {imdbID, Title, Year, Poster} of movies) {
        movie = new Movie(imdbID, Title, Year, Poster);
        html += movie.render();
    }

    html += `</div>`;
    MOVIE_CONTAINER.innerHTML = html;

    getMovieDetail();
}

async function getMovieDetail() {
    const MOVIE = document.querySelectorAll('.movie');

    MOVIE.forEach((movie) => {
        movie.addEventListener('click', function(e) {
            e.preventDefault();
            const clickedElement = e.currentTarget;
            const imdbID = clickedElement.getAttribute('data-imdb');
            showMovieByImdbId(imdbID);
        })
    })
}

async function showMovieByImdbId(imdbID) {
    const request = await getMovie(imdbID, "detail");
    const movie = new Movie(
        request.imdbID, 
        request.Title, 
        request.Year, 
        request.Poster, 
        request.Plot,
        request.Released,
        request.Genre,
        request.Director,
        request.Actors,
        request.imdbRating
    );
    console.log(request);
    //render details movie in Modal
    MODAL_CONTENT.innerHTML = movie.renderDetails();
    openModal();
}

window.addEventListener('DOMContentLoaded', initApp);
