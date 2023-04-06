import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getGenres, getSearchData } from "../api/tmdb-api";
import Loading from "../components/loading/index";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MovieCard from "../components/movieCard";

const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
  };
const SearchPage = () => {
    const  [searchData,setSearchData] = useState([])
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { data,isLoading} = useQuery("genres", getGenres);
  let query = params?.get("query");
  const {
    data: searchResults,
    error,
    isError,
  } = useQuery(["search", { query }], getSearchData);


  useEffect(()=>{
    if(searchResults){
        setSearchData(searchResults?.results)
    }
  },[searchResults])


  if (isLoading) {
    return <Loading />;
  }
  const genres = data.genres;

  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }
  const handleGenreChange = (e) => {
   let filteredResults=searchResults?.results?.filter((item)=>{
    return e.target.value>0?item?.genre_ids.includes(e.target.value):true
   })

   setSearchData(filteredResults)
  };

  return (
    <div className="searchPage">
        <div className="filterContainer">

            <h1 className="filter">Filter by Genre</h1>
            {
                genres&&
            <FormControl sx={{...formControl}}>
                <InputLabel>Genre</InputLabel>
                <Select
                labelId="genre-label"
                id="genre-select"
                defaultValue=""
                //   value={props.genreFilter}
                onChange={handleGenreChange}
                >

                {genres.map((genre) => {
                return (
                    <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                    </MenuItem>
                );
                })}
            </Select>
            </FormControl>
            }
        </div>
        {
            searchData&&
      <div className="shows">
        {searchData.map((item, index) => {
          if (item?.poster_path) {
            return (
              <div className="item">
                <MovieCard data={item} />
              </div>
            );
          }
        })}
      </div>
        }
    </div>
  );
};

export default SearchPage;
