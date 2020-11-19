import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from './components/MovieList';
import MovieListHead from './components/MovieListHead';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import SearchBox from './components/SearchBox';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async(searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d1a32bdb`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }    
  }

  useEffect(() => {
    getMovieRequest(searchValue)    
  }, [searchValue])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
  }

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHead heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList 
          movies={movies} 
          handleFavouritesClick={addFavouriteMovie} 
          favouriteComponent={AddFavourites} 
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHead heading='Favourites' />
      </div>
      <div className="row">
        <MovieList 
          movies={favourites} 
          handleFavouritesClick={removeFavouriteMovie} 
          favouriteComponent={RemoveFavourites} 
        />
      </div>      
    </div>
  )
}

export default App;
