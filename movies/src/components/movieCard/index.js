import React, { useContext } from "react";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import AddToFavoritesIcon from '../../components/cardIcons/addToFavorites'
import Button from '@mui/material/Button';
import { Link, useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoviesContext } from "../../contexts/moviesContext";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddToPlaylistIcon from "../cardIcons/addToPlaylist";
import RemoveFromPlaylistIcon from "../cardIcons/removeFromPlaylistIcon";


const MovieCard = ({ data }) => {
    const { favorites, addToFavorites,playlist } = useContext(MoviesContext);
  const context = useContext(MoviesContext);
   
    const location = useLocation()
    if (favorites.find((id) => id === data.id)) {
        data.favorite = true;
      } else {
        data.favorite = false
      }

      if (playlist.some((item) => item.id === data.id)) {
        data.playlist = true;
      } else {
        data.playlist = false;
      }

      const handleRemoveFromFavorites = (e) => {
        e.preventDefault();
        context.removeFromFavorites(data);
      };
  return (
    <div className="movieCard">
      <h1 className="title">{data?.title?.slice(0,40)}{data?.title?.length>40&&"..."}</h1>
      
      <div className="imageContainer">
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt="Thumbnail"
        />
      </div>
      <div className="metaData">
        <div className="release_date">
          <CalendarIcon fontSize="small" />
          <span>{data?.release_date}</span>
        </div>

        <div className="ratings">
        <StarRateIcon fontSize="small" />
        <span>{data?.vote_average}</span>
        </div>
      </div>
      <div className="buttons">
      {
        data.favorite?(

      <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
        ):(
            <AddToFavoritesIcon movie={data}/>
        )
      }
      {
        data?.favorite&&location?.pathname==="/movies/favorites"&&
      <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
        <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
      }

        {location?.pathname === "/movies/upcoming" || location?.pathname === "/movies/playlist" ? data?.playlist ? (
          <RemoveFromPlaylistIcon movie={data} />
        ) : (
          <AddToPlaylistIcon movie={data} />
        ):null}

        <Link to={`/movies/${data.id}`}>
        <Button variant="outlined">More Info</Button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;


