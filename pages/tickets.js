import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container';


import TicketForm from '../src/reservation/TicketForm';
import TicketOverview from '../src/reservation/TicketOverview';
import BasePageLayout from "../src/BasePageLayout";
import MovieTitleDate from "../src/MovieTitleDate";
import { ticketApi } from '../src/movieApi';

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
  ticketContainer: {
    borderRadius: 3,
    padding: 24,
    background: 'rgba(60, 60, 60, 0.95)',
  },

}));


const createInitialValues = ({ nrOfSeats, movieDateId }) => {

  // if (ticketRequest) {
  //   return ticketRequest;
  // }
  const paymentTypes = parseInt(nrOfSeats) === 1 ? ['normal'] : ['normal', 'normal']
  return {
    nrOfSeats,
    movieDateId,
    terms: false,
    email: '',
    emailVerification: '',
    paymentTypes
  };
}

// email: 'robert.hofstra@gmail.com',
// emailVerification: 'robert.hofstra@gmail.com',


const getAvailability = ({ availability, nrOfSeats }) => {

  const availablitityProp = parseInt(nrOfSeats) === 1 ? 'nrOfSingleSeatsTicketsAvailable' : 'nrOfDoubleSeatsTicketsAvailable';
  return availability[availablitityProp] > 0;
}

const STATE_INITIALIZING = 'initializing';
const STATE_TICKET_REQUEST_FORM = 'ticketRequestForm';
const STATE_TICKET_REQUEST_CHECK_PRICE_AVAILABILITY = 'ticketRequestCheckPriceAvailablity';
const STATE_NO_TICKETS_AVAILABLE = 'noticketsAvailable';
const STATE_TICKET_REQUEST_SHOW_OVERVIEW = 'ticketRequestOverview';
const STATE_TICKET_REQUEST_CONFIRMATION = 'ticketRequestConfirmation';
const STATE_TICKET_RESPONSE_CONFIRMATION = 'ticketResponceConfirmation';





const TicketResponse = ({ ticketRequestState }) => {

  const ticketRequest = ticketRequestState.ticketRequest;
  const ticketResponse = ticketRequestState.ticketResponse;

  if (ticketResponse.available) {
    if (ticketResponse.redirectUrl) {
      return <div>Klik op de link om de betalig af te ronden <a href={ticketResponse.redirectUrl}>betalen</a></div>
    }
    if (ticketResponse.verificationBy == 'email') {
      return <div>Er wordt een mail naar {ticketRequest.email} om de ticket aanvraag te bevestigen.</div>
    }
    return <div>Er is iets fout gegaan</div>
  } else {
    return <div>Helaas zijn de tickets inmiddels uitverkocht.</div>
  }
}


const initialTicketRequestState = {
  state: STATE_INITIALIZING,
  ticketRequest: null,
  ticketResponse: null,
  availability: null,
  priceAndAvailability: null
}


const InitializingWidget = ({ ticketRequestState, onSubmit }) => {
  return <div>Beschikbaarheid controleren...</div>;
}

const TicketFormWidget = ({ ticketRequestState, onSubmit }) => {
  return <TicketForm
    onSubmit={onSubmit}
    initialValues={ticketRequestState.ticketRequest}
  />
}

const RequestPriceAvailablityWidget = ({ ticketRequestState, onSubmit }) => {
  return <div>Beschikbaarheid controleren en prijs bepalen...</div>
}

const NoTicketsAvailablityWidget = ({ ticketRequestState, onSubmit }) => {
  return <div>Helaas zijn er geen tickets meer beschibaar.</div>
}

const StartTransactionWidget = ({ ticketRequestState, onSubmit, backToForm, completeTransaction }) => {
  return <div>Beschikbaarheid nogmaals controleren en transactie bevestigen...</div>
}

const ShowTicketRequestOverview = ({ ticketRequestState, onSubmit, backToForm, completeTransaction }) => {

 

  return <TicketOverview
    ticketRequest={ticketRequestState.ticketRequest}
    priceAndAvailability={ticketRequestState.priceAndAvailability}
    onPrevious={backToForm}
    onCompleteTransaction={completeTransaction} />
}

const stateToWidget = {
  [STATE_INITIALIZING]: InitializingWidget,
  [STATE_TICKET_REQUEST_FORM]: TicketFormWidget,
  [STATE_TICKET_REQUEST_CHECK_PRICE_AVAILABILITY]: RequestPriceAvailablityWidget,
  [STATE_TICKET_REQUEST_SHOW_OVERVIEW]: ShowTicketRequestOverview,
  [STATE_NO_TICKETS_AVAILABLE]: NoTicketsAvailablityWidget,
  [STATE_TICKET_REQUEST_CONFIRMATION]: StartTransactionWidget,
  [STATE_TICKET_RESPONSE_CONFIRMATION]: TicketResponse
}

const TicketsPage = ({ movieDateId, nrOfSeats }) => {

  const classes = useStyles();

  const [ticketRequestState, setTicketRequestState] = useState(initialTicketRequestState);

  const getInitData = async () => {
    console.log("getting init data");
    const availability = await ticketApi.getAvailability(movieDateId);

    const hasAvailability = getAvailability({ availability, nrOfSeats });
    const state = hasAvailability ? STATE_TICKET_REQUEST_FORM : STATE_NO_TICKETS_AVAILABLE
    const ticketRequest = createInitialValues({ nrOfSeats, movieDateId });
    setTicketRequestState({ state, availability, ticketRequest });
  };


  useEffect(() => {
    getInitData();
  }, []);


  const movieTitle = ticketRequestState.availability ? ticketRequestState.availability.movieTitle : "";
  const backgroundImageUrl = "http://rkzbiosapi.jimboplatform.nl/media/original_images/zaal01.jpg"
  const title = `Tickets voor ${movieTitle} `

  const getPriceAvaliability = async (ticketRequest) => {
    const newState = {...ticketRequestState, ticketRequest, state: STATE_TICKET_REQUEST_CHECK_PRICE_AVAILABILITY}
    setTicketRequestState(newState);

    const priceAndAvailability = await ticketApi.getPriceAvailability(ticketRequest);
    setTicketRequestState({...newState, state: STATE_TICKET_REQUEST_SHOW_OVERVIEW, priceAndAvailability });
  }

  const backToForm = () => {
    setTicketRequestState({...ticketRequestState, state: STATE_TICKET_REQUEST_FORM, ticketResponse: null, priceAndAvailability: null});
  }

  const completeTransaction = async () => {
    const newState = {...ticketRequestState, state: STATE_TICKET_REQUEST_CONFIRMATION};
    setTicketRequestState(newState);
    const ticketResponse = await ticketApi.requestTicket(ticketRequestState.ticketRequest);
    console.log(ticketResponse)
    if (ticketResponse.redirectUrl) {
      window.location = ticketResponse.redirectUrl
    }
    setTicketRequestState({...newState, state: STATE_TICKET_RESPONSE_CONFIRMATION, ticketResponse});
  }

  console.log(ticketRequestState);

  const Widget = stateToWidget[ticketRequestState.state];

  return (
    <BasePageLayout backgroundImage={backgroundImageUrl} clases={classes}
      pageTitle={title}
      mainMenuItems={[{}]} >
      <Container maxWidth="lg">
        <Grid container spacing={4} className={classes.movieContainer}>
          <Grid item xs={12} md={6}>
            <Box className={classes.ticketContainer}>
              <MovieTitleDate title={movieTitle} date={ticketRequestState.availability ? ticketRequestState.availability.movieDate : null} />
              <Widget
                ticketRequestState={ticketRequestState}
                onSubmit={getPriceAvaliability}
                backToForm={backToForm}
                completeTransaction={completeTransaction} />
            </Box>

          </Grid>
          <Grid item xs={12} md={6}>
          </Grid>
        </Grid>
      </Container>
    </BasePageLayout>
  )
}


TicketsPage.getInitialProps = async function ({ query: { movieId, movieDateId, nrOfSeats } }) {

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