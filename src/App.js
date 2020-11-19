import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/app.css';
import MovieList from './components/MovieList';
import MovieListHead from './components/MovieListHead';

// import api from './services/api';
import SearchBox from './components/SearchBox';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  const handleMovieRequest = async() => {
    const url = 'http://www.omdbapi.com/?s=rambo&apikey=d1a32bdb';
    const response = await fetch(url);
    const responseJson = await response.json();

    setMovies(responseJson.Search);
  }

  useEffect(() => {
    handleMovieRequest()    
  }, [])

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHead heading='Movies' />
        <SearchBox />
      </div>
      <div className="row">
        <MovieList movies={movies} />
      </div>      
    </div>
  )
}

export default App;
