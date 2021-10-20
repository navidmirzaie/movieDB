function Movie(
  imdbID = "",
  Title = "",
  Year = "",
  Poster = "",
  Plot = "",
  Released = "",
  Genre = "",
  Director = "",
  Actors = "",
  imdbRating = ""
) {
  this.imdbID = imdbID;
  this.Title = Title;
  this.Year = Year;
  this.Poster = Poster;
  this.Plot = Plot;
  this.Released = Released;
  this.Genre = Genre;
  this.Director = Director;
  this.Actors = Actors;
  this.imdbRating = imdbRating;
}

Movie.prototype.showGenre = function () {
  const genres = this.Genre.split(",");
  return genres
    .map((genre) => {
      return `<li class='genre'>${genre}</li>`;
    })
    .join("");
};

Movie.prototype.showRating = function () {
  let cssClass = "rating--good";
  if (this.imdbRating <= "5.5") {
    cssClass = "rating--bad";
  }
  return `<div class='rating ${cssClass}'>${this.imdbRating}</div>`;
};

Movie.prototype.renderDetails = function () {
  let html = `
        <header class="modal-header">
            <div class='cover'>
                <img src='${
                  this.Poster
                }' class='box-art box-art--large' alt='Cover of the movie ${
    this.Title
  }'>
            </div>
            <div class='title title--large'>
                <h3>${this.Title}</h3>
                <p class='plot'>${this.Plot}</p>
                ${this.showRating()}
            </div>
        </header>
        <main class="modal-main">
            <ul class='genre'>
               ${this.showGenre()}
            </ul>
            <ul class='additional-info'>
                <li>
                    <span class='key'>Director</span>
                    <span class='value'>${this.Director}</span>
                </li>
            </ul>
            <ul class='additional-info'>
                <li>
                    <span class='key'>Actors</span>
                    <span class='value'>${this.Actors}</span>
                </li>
            </dl>
        </main>
    `;

  return html;
};

Movie.prototype.render = function () {
  if (this.Poster === "N/A") {
    this.Poster =
      "https://icon2.cleanpng.com/20180202/wiw/kisspng-popcorn-maker-clip-art-popcorn-transparent-png-5a74c09246fb20.2194118515176009142908.jpg";
  }

  let html = `
        <div class='movie' data-imdb='${this.imdbID}' tabindex='0'>
            <div class='cover'>
                <img src='${this.Poster}' class='box-art' alt='Cover of the movie ${this.Title}'>
            </div>
            <div class='title'>
                <h3>${this.Title}</h3>
                <span class='year'>${this.Year}</span>
            </div>
            <div class='detail-call-to-action'>
                <button id='movie-detail' class='show-detail'>Show detail</button>
            </div>
        </div>
    `;

  return html;
};

export default Movie;
