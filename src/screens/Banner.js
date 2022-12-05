import React, {useState, useEffect} from "react";
import "../styles/Banner.css";
import axios from "../API/axios";
import requests from "../API/Request";

export default function Banner() {

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie (
        request.data.results[
          Math.floor(Math.random()* request.data.results.length - 1) //nombre aléatoire pour fetch un film
        ]  
      )
      return request;
    }
    fetchData();
  }, [])

  function tooLoong (string, nbrC){
    return string?.length > nbrC ? string.substr(0, nbrC - 1) + '(...)' : string
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
            <button className="banner_button">Movie</button>
            <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">
          {tooLoong(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom"></div>
    </header>
  );
}
