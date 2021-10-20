import React from 'react';



import movieApi from '../src/movieApi';
import MoviePageBase from '../src/MoviePageBase';



const HomePage = (props) => {
  return MoviePageBase(props);
}


const HOME_PAGE_ID = 10;

HomePage.getInitialProps = async function () {


  let [
    homePage,
    currentMovie,
    activeMovies,
    mainMenuItems
  ] = await Promise.all([
    await await movieApi.getPage(HOME_PAGE_ID),
    await movieApi.getCurrentMovie(),
    await movieApi.getMovies({}),
    await movieApi.getMainMenu()
  ]);

  //console.log("data ", currentMovie, " all ", activeMovies)

  return {
    homePage,
    currentMovie,
    activeMovies,
    mainMenuItems
  }

}

export default HomePage;
