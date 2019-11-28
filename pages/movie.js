import React from 'react';

import movieApi from '../src/movieApi';
import MoviePageBase from '../src/MoviePageBase';



const MoviePage = (props) => {
  return MoviePageBase(props);
}




MoviePage.getInitialProps = async function ({res, query: { id, name } }) {

  let [
    currentMovie,
    activeMovies,
  ] = await Promise.all([
    await movieApi.getMovie(id),
    await movieApi.getMovies({})
  ]);
  
  return {
    currentMovie,
    activeMovies
  }

}

export default MoviePage;
