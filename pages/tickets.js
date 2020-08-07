import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

//import { motion } from "framer-motion";

import TicketForm from '../src/reservation/TicketForm';

import BasePageLayout from "../src/BasePageLayout";
import { toFullMediaUrl, getMoviePosterUrl, getFormatedMovieDate } from '../src/utils';
//import movieApi from '../src/movieApi';

import {useMovie, useAvailability} from '../src/movieApi'


const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 40
  },
  image: {
    width: "100%"
  },
  movieContainer: {
    borderRadius: 3,
    background: 'rgba(0, 0, 0, 0.85)'
  },
  bodyParagraph: {
    color: "lightgrey",
  },
}));



const Image = (props) => {
  return <img className={props.classes.image}  src={toFullMediaUrl(props.block.value)} />
}







const TicketsPage = (props) => {

  const { movie, isLoading, isError } = useMovie(props.movieId)
  const { availability, isAvalaibiltyLoading, isAvailabilityError} = useAvailability(props.movieDateId);

  console.log("availablity ", availability);

  const movieTitle = movie ? movie.title : " Loading";

  const movieDateStr = availability ? getFormatedMovieDate(availability.movieDate): "Loading";

  const classes = useStyles();
  //const backgroundImageUrl = toFullMediaUrl(props.page.pageBackDrop.meta.download_url);
  const  backgroundImageUrl ="http://rkzbiosapi.jimboplatform.nl/media/original_images/zaal01.jpg"
  const title = `Tickets voor ${movieTitle} `
  return (
    <BasePageLayout backgroundImage={backgroundImageUrl} clases={classes} 
        pageTitle={title} 
        mainMenuItems={[{}]} >
      <Container maxWidth="lg">
        <Grid container spacing={4} className={classes.movieContainer}>
          <Grid item xs={12} md={6}>
            <TicketForm movieTitle={movieTitle} movieDate={movieDateStr} nrOfSeats={props.nrOfSeats} />
          </Grid>
          <Grid item xs={12} md={6}>
           
          </Grid>          
        </Grid>
      </Container>
    </BasePageLayout>
  )
}


TicketsPage.getInitialProps = async function  ({res, query: { movieId, movieDateId, nrOfSeats } }) {
//   let [
//     page,
//     activeMovies,
//     mainMenuItems
//   ] = await Promise.all([
//     await movieApi.getPage(id),
//     await movieApi.getMovies({}),
//     await movieApi.getMainMenu()
//   ]);

  console.log("movieId ", movieId);
  console.log("movieDateId ", movieDateId);
  console.log("nrOfSeats ", nrOfSeats);

  return {
    movieId,
    movieDateId,
    nrOfSeats    
  }
}

export default TicketsPage;