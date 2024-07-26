import { filter, getMovies } from "./api";
import Movie from "./Movie";

// MOVIE SELECTOR(S)
const MOVIE_CONTAINER = document.querySelector(".movies-wrapper");

// SEARCH SELECTORS
const SEARCH_BAR = document.querySelector("#searchbar");
const SEARCH_BUTTON = document.querySelector("#search");

// MODAL SELECTORS
const MODAL_WINDOW = document.querySelector(".modal-window");
const MODAL_CONTENT = document.querySelector(".modal-window .modal-content");
const CLOSE_MODAL_BUTTON = document.querySelector(".modal-window .close");
const SELECT_FILTERS = document.querySelector(".filters");

let selectedFilter;

function initApp() {
  //bind events
  SEARCH_BUTTON.addEventListener("click", search);
  SEARCH_BAR.addEventListener("keyup", searchByEnter);
  MODAL_CONTENT.addEventListener("keyup", closeModalByEscape);
  CLOSE_MODAL_BUTTON.addEventListener("click", closeModal);
  SELECT_FILTERS.addEventListener("change", setFilter);
}

function searchByEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    search(event);
  }
}

function closeModalByEscape(event) {
  if (event.keyCode === 27) {
    event.preventDefault();
    closeModal();
  }
}

function openModal() {
  MODAL_WINDOW.classList.remove("close-modal");
  MODAL_WINDOW.classList.add("open-modal");
  MODAL_CONTENT.focus();
}

function closeModal() {
  MODAL_WINDOW.classList.add("close-modal");
  MODAL_WINDOW.classList.remove("open-modal");
}

function setFilter(event) {
  event.preventDefault();
  const currentFilter = event.currentTarget.value;
  selectedFilter = currentFilter;
  search(event);
}

async function search(event) {
  event.preventDefault();
  let query = SEARCH_BAR.value;

  const results = await getMovies(query);

  try {
    renderList(results.Search);
  } catch (error) {
    MOVIE_CONTAINER.innerHTML = `<strong>${results.Error} try typing the correct title</strong>`;
  }
}

function renderList(collection) {
  let html = ``;
  let movie = null;

  //show only movies
  const movies = filter(collection, selectedFilter);

  for (let { imdbID, Title, Year, Poster } of movies) {
    movie = new Movie(imdbID, Title, Year, Poster);
    html += movie.render();
  }

  html += `</div>`;
  MOVIE_CONTAINER.innerHTML = html;

  getDetails();
}

async function getDetails() {
  const MOVIE = document.querySelectorAll(".movie");

  MOVIE.forEach((movie) => {
    movie.addEventListener("click", function (e) {
      e.preventDefault();
      const clickedElement = e.currentTarget;
      const imdbID = clickedElement.getAttribute("data-imdb");
      showByImdbId(imdbID);
    });
  });
}

async function showByImdbId(imdbID) {
  const request = await getMovies(imdbID, "detail");
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
    request.imdbRating,
  );
  //render details movie in Modal
  MODAL_CONTENT.innerHTML = movie.renderDetails();
  openModal();
}

window.addEventListener("DOMContentLoaded", initApp);
