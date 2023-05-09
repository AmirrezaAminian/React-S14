import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsloading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film/");

      if(!response.ok ){
        throw new Error('Something went wrong!')
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseData: movieData.release_data,
        };
      });
      setMovies(transformedMovies);
      setIsloading(false);
    }
   catch (err) {
      setError(`${err.message}`);
    }  
    setIsloading(false)
  }


  let content = <p>Found no movies.</p>

  if(movies.length >0){
    content = <MoviesList movies ={movies}/>
  }


  if(error){
    content = <p>{error}</p>
  }

  if(isLoading){
    content = <p>Loading...</p>
  }





  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;

