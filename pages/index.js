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
  ] = await Promise.all([
    await movieApi.getCurrentMovie(),
    await movieApi.getMovies({})
  ]);

  //console.log("data ", currentMovie, " all ", activeMovies)

  return {
    currentMovie,
    activeMovies
  }

}

//export default withApollo( ProvideHomePage);
export default HomePage;
