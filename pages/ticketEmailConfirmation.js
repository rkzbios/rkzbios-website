import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { ticketApi } from '../src/movieApi';
import MovieTitleDate from "../src/MovieTitleDate";
import BasePageLayout from "../src/BasePageLayout";

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

const TicketStatusAccepted = ({ ticketConfirmationStatus }) => {
    return <React.Fragment>
        <MovieTitleDate title={ticketConfirmationStatus.movieTitle} date={ticketConfirmationStatus.movieDate} />
        <div>U ticket is geaccepteerd, de ticket wordt per mail opgestuurd.</div>
    </React.Fragment>

}

const TicketStatusRejected = ({ ticketConfirmationStatus }) => {
    return <React.Fragment>
        <MovieTitleDate title={ticketConfirmationStatus.movieTitle} date={ticketConfirmationStatus.movieDate} />
        <div>Ticket verzoek is verlopen, U kunt proberen om een nieuw ticket verzoek in te dienen.</div>
    </React.Fragment>

}

const TicketStatusWaiting = ({ ticketConfirmationStatus, onTicketConfirm }) => {
    return <div>Loading....</div>
}


const ConfirmTicket = ({ ticketConfirmationStatus, onTicketConfirm, isConfirming }) => {
    return <React.Fragment>
        <MovieTitleDate title={ticketConfirmationStatus.movieTitle} date={ticketConfirmationStatus.movieDate} />

        {isConfirming ? <div>wachten tot bevestinging</div>:
        <Button variant="contained" color="primary" disableElevation onClick={() => onTicketConfirm()}>
            Bevestig
            </Button>}
    </React.Fragment>
}

const statusWidgetMap = {
    "open": ConfirmTicket,
    "accepted": TicketStatusAccepted,
    "rejected": TicketStatusRejected
}



const TicketEmailConfirmationPage = ({ confirmationId }) => {

    // console.log("confirmationId ", confirmationId);
    const classes = useStyles();

    const [isConfirming, setConfirming] = useState(false);
    const [ticketConfirmationStatus, setTicketConfirmationStatus] = useState(null);

    const confirmTicket = async () => {
        setConfirming(true);
        const ticketConfirmationStatus = await ticketApi.confirmTicket(confirmationId);
        setConfirming(false);
        setTicketConfirmationStatus(ticketConfirmationStatus);
    }


    const getData = async () => {
        const ticketConfirmationStatus = await ticketApi.getTicketEmailConfirmationStatus(confirmationId);
        setTicketConfirmationStatus(ticketConfirmationStatus);
    };


    useEffect(() => {
        getData();
    }, []);


    const TicketConfirmationWidget = ticketConfirmationStatus ?
        statusWidgetMap[ticketConfirmationStatus.confirmationStatus] :
        TicketStatusWaiting;


    const backgroundImageUrl = "http://rkzbiosapi.jimboplatform.nl/media/original_images/zaal01.jpg"
    return (
        <BasePageLayout backgroundImage={backgroundImageUrl} clases={classes}
            pageTitle={ticketConfirmationStatus ? `Ticket bevestiging voor ${ticketConfirmationStatus.movieTitle} ` : ''}
            mainMenuItems={[{}]} >
            <Container maxWidth="lg">
                <Grid container spacing={4} className={classes.movieContainer}>
                    <Grid item xs={12} md={6}>
                        <Box className={classes.ticketContainer}>
                            <TicketConfirmationWidget 
                                isConfirming={isConfirming}
                                ticketConfirmationStatus={ticketConfirmationStatus} 
                                onTicketConfirm={confirmTicket} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    </Grid>
                </Grid>
            </Container>
        </BasePageLayout>
    )
}


TicketEmailConfirmationPage.getInitialProps = async function ({ query: { confirmationId } }) {
    return {
        confirmationId
    }
}

export default TicketEmailConfirmationPage;

