import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { getCast, getMovieImages, getSimiliarShows } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import MovieList from "../movieList";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";

import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import Spinner from "../spinner/index";
import { Navigation,Pagination } from "swiper";
import { Button } from "@mui/material";
import MovieCard from "../movieCard";


const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate()
 
  const { data , error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }],
    getMovieImages
  );
  const { data: casts, } = useQuery(
    ["cast", { id: movie.id }],
    getCast
  );
  const { data: similiarShows } = useQuery(
    ["similiar", { id: movie.id }],
    getSimiliarShows
  );
  
  if (isLoading) {
    return <Spinner/>;
  }
  const images = data.posters

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  const castAndCrewHandler = () => {
    navigate(`/movies/cast-crew?movieId=${movie.id}`)
  }
  const similarMoviesHandler = () => {
    navigate(`/movies/similarmovies?movieId=${movie.id}`)
  }
  return (
    <>
      <Typography sx={{ color: "#fff" }} variant="h5" component="h3">
        Overview
      </Typography>

      <Typography sx={{ color: "#aaa" }} variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip
            sx={{ color: "#fff", backgroundColor: "primary.main" }}
            label="Genres"
            color="primary"
          />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip
              sx={{ color: "#fff", backgroundColor: "primary.main" }}
              label={g.name}
            />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        <Chip
          sx={{ color: "#fff", backgroundColor: "primary.main" }}
          icon={<AccessTimeIcon />}
          label={`${movie.runtime} min.`}
        />
        <Chip
          sx={{ color: "#fff", backgroundColor: "primary.main" }}
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          sx={{ color: "#fff", backgroundColor: "primary.main" }}
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip
          sx={{ color: "#fff", backgroundColor: "primary.main" }}
          label={`Released: ${movie.release_date}`}
        />
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip
            sx={{ color: "#fff", backgroundColor: "primary.main" }}
            label="Production Countries"
            color="primary"
          />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip
              sx={{ color: "#fff", backgroundColor: "primary.main" }}
              label={g.name}
            />
          </li>
        ))}
      </Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>
      <Button variant="outlined" sx={{marginTop:"10px"}} onClick={castAndCrewHandler}>Cast&Crew</Button>
      <Button variant="outlined" sx={{marginTop:"10px"}} onClick={similarMoviesHandler}>Similar Movies</Button>
      
    
      {
        images&&
        <>
        <h1 className="heading">Gallery</h1>
        <div className="gallery" style={{display: "block",height: "400px"}}>
          <Swiper 
            modules={[Navigation,Pagination]}
            spaceBetween={10}
            slidesPerView={6}
            slidesPerGroup={6}
            navigation={true}
            watchSlidesProgress
            speed={1000}
            loop={false}
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 2,
                slidesPerGroup:1,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
                slidesPerGroup:2,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
                slidesPerGroup:3,
              },
              981: {
                slidesPerView: 5,
                spaceBetween: 1.5,
                slidesPerGroup:4,
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 5,
                slidesPerGroup: 6,
              },
              // 2200:{
              //   slidesPerView: thumbnailOrientation == "PORTRAIT" ? 6 : 8,
              //   spaceBetween: 5,
              //   slidesPerGroup: thumbnailOrientation == "PORTRAIT" ? 6 : 8,
  
              // }
            }}
          >
            {
              images?.map((image)=>(

            <SwiperSlide>
              <img src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} alt="Thumbnail"/>
            </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        
        </>
      }
      

      
    </>
  );
};
export default MovieDetails;
