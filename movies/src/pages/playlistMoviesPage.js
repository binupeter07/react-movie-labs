import React, { useContext, useEffect, useState } from 'react'
import PageTemplate from '../components/templateMovieListPage';
import { MoviesContext } from "../contexts/moviesContext";

const PlaylistMoviesPage = () => {
  const {playlist } = useContext(MoviesContext);

    const [movies,setMovies] = useState([])

    useEffect(()=>{
        if(playlist){
            setMovies(playlist)
        }
    },[playlist])
  return (
    <PageTemplate
      title="Playlist"
      movies={movies}
    //   action={(movie) => {
    //     return (
    //       <>
    //         <RemoveFromFavorites movie={movie} />
    //         <WriteReview movie={movie} />
    //       </>
    //     );
    //   }}
    />
  )
}

export default PlaylistMoviesPage