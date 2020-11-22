const APIURL =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.querySelector('main');
const search = document.getElementById('search');
const form = document.getElementById('form');

function showMovies(movies) {
	main.innerHTML = '';

	movies.forEach((movie) => {
		const movieElm = document.createElement('div');

		movieElm.classList.add('movie');

		movieElm.innerHTML = `
				<img src="${IMGPATH + movie.poster_path}" />
				<div class="movie-info">
					<h3>${movie.title}</h3>
					<span class="${getClassByAverage(movie.vote_average)}" >${movie.vote_average}</span>
				</div>
				<div class="overview">
					${movie.overview}
				</div>
            `;

		main.append(movieElm);
	});

	if (movies.length < 1) {
		const NotFoundMovie = document.createElement('h2');
		NotFoundMovie.innerHTML = 'No Movie Found';
		main.append(NotFoundMovie);
	}
}

async function fetchMovies(api) {
	const res = await fetch(api);
	const movies = await res.json();

	showMovies(movies.results);
}

function getClassByAverage(vote) {
	if (vote >= 8) {
		return 'green';
	} else if (vote >= 5) {
		return 'orange';
	} else {
		return 'red';
	}
}

form.addEventListener('keyup', searchMovie);

function searchMovie(e) {
	e.preventDefault();
	let searchValue = search.value;
	if (searchValue) {
		fetchMovies(SEARCHAPI + searchValue);
	} else {
		fetchMovies(APIURL);
	}
}

fetchMovies(APIURL);
