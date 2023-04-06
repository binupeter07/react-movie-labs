import React from 'react'
import { useLocation } from 'react-router-dom';
import { getSimiliarShows } from '../api/tmdb-api';
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Pagination } from "swiper";
import { useQuery } from 'react-query';

const SimilarMovies = () => {
  const location = useLocation()
  const params = new URLSearchParams(location?.search)
  let movieId = params?.get("movieId")
  const { data: similarmovies, } = useQuery(
    ["similar", { id:movieId }],
    getSimiliarShows
  );

  console.log(similarmovies,"similiar");
  return (
    <>

{
        similarmovies&&
        <>
        <h1 className="heading">Crew</h1>
        <div className="crew">
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
              //   slidesPerView:  6 : 8,
              //   spaceBetween: 5,
              //   slidesPerGroup:  6 : 8,
  
              // }
            }}
          >
            {
              similarmovies?.results?.map((item)=>{
                if(item?.poster_path){
                  return(

                  <SwiperSlide>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="Thumbnail" />
                    <h6 className="name">{item?.name}</h6>
                  </SwiperSlide>
                  )
                }
              })
            }
          </Swiper>
        </div>
        
        </>
      }
    </>
  )
}

export default SimilarMovies