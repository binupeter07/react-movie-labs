import React from "react";
import { upcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'

const Upcoming = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('upcoming', upcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 
  const addToPlaylist = (movieId) => true 


const toDo = () => true;
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return(
          <>
           <AddToFavoritesIcon movie={movie} />
         <AddToPlaylistIcon movie={movie} />  
         </>
        )
      }}

    />
    
);
    }

export default Upcoming;
