import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

//import { motion } from "framer-motion";

import MovieTitleDate from "../src/MovieTitleDate";

import BasePageLayout from "../src/BasePageLayout";


import { useGetTicketStatus} from '../src/movieApi'


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
  ticketContainer: {
    borderRadius: 3,
    padding: 24,
    background: 'rgba(60, 60, 60, 0.95)',
  },
}));



const Image = (props) => {
  return <img className={props.classes.image}  src={toFullMediaUrl(props.block.value)} />
}



const TicketStatusOpen = ({ticketStatus}) => {
  return <div>Wij wachten op betaling</div>
}

const TicketStatusRejected = ({ticketStatus}) => {
  return <div>De ticket betaling is geannuleerd</div>
}

const TicketStatusAccepted = ({ticketStatus}) => {
  return <div>U ticket is geaccepteerd, de ticket wordt per mail opgestuurd naar {ticketStatus.ticketRequest.email} </div>
}

const TicketStatusWaiting = ({ticketStatus}) => {
  return <div>Loading....</div>
}

const statusToMessage = {
  "open": TicketStatusOpen,
  "accepted": TicketStatusAccepted,
  "rejected": TicketStatusRejected,
}


const TicketAfterPayentPage = ({ticketId}) => {
  const classes = useStyles();
  const { ticketStatus, isTicketStatusLoading, isTicketStatusError} = useGetTicketStatus(ticketId);
  

  console.log("ticketId ", ticketId);

  const movieTitle = ticketStatus ? ticketStatus.movieTitle : "";
  const MessageWidget = ticketStatus ? statusToMessage[ticketStatus.status]: TicketStatusWaiting;

  const  backgroundImageUrl ="http://rkzbiosapi.jimboplatform.nl/media/original_images/zaal01.jpg"
  const title = `Tickets payment ${movieTitle} `
  return (
    <BasePageLayout backgroundImage={backgroundImageUrl} clases={classes} 
        pageTitle={title} 
        mainMenuItems={[{}]} >
      <Container maxWidth="lg">
        <Grid container spacing={4} className={classes.movieContainer}>
          <Grid item xs={12} md={6}>
            <Box className={classes.ticketContainer}>
              {isTicketStatusLoading ? <div>Ophalen gegevens</div>:
                <React.Fragment>
                  <MovieTitleDate title={movieTitle} date={ticketStatus? ticketStatus.movieDate: null} />
                  <MessageWidget ticketStatus={ticketStatus}/>
                </React.Fragment>
              }
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
           
          </Grid>
          </Grid>
      </Container>
    </BasePageLayout>
  )
}


TicketAfterPayentPage.getInitialProps = async function  ({query: { ticketId } }) {
  return {
    ticketId    
  }
}

export default TicketAfterPayentPage;