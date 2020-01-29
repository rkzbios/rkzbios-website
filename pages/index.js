import React from 'react';



import movieApi from '../src/movieApi';
import MoviePageBase from '../src/MoviePageBase';



const HomePage = (props) => {
  return MoviePageBase(props);
}




HomePage.getInitialProps = async function () {


  let [
    currentMovie,
    activeMovies,
    mainMenuItems
  ] = await Promise.all([
    await movieApi.getCurrentMovie(),
    await movieApi.getMovies({}),
    await movieApi.getMainMenu()
  ]);

  //console.log("data ", currentMovie, " all ", activeMovies)

  return {
    currentMovie,
    activeMovies,
    mainMenuItems
  }

}

export default HomePage;
