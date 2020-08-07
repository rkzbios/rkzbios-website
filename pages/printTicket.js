import React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import movieApi from '../src/movieApi';
import BasePrintPage from '../src/BasePrintPage';

import { makeStyles } from '@material-ui/core/styles';
import { getPrintTheme } from '../src/themeForPrint';
import { getFormatedMovieDate } from '../src/utils';


import QRCode from 'qrcode.react';

import { H1, Body1 } from "../src/Typo";

const useStyles = makeStyles(theme => ({

    printContainer: {
        width: "190mm",
        padding: "10mm",
        backgroundColor: "#fff",
        color: "#000"
    },

    ticketLogo: {
        width: "100%"
    },

    main: {
        display: "flex",
        flexDirection: 'column',
    },
    ticketInfoContainer: {
        marginTop: "5mm",
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between"
    }
}));

const PrintTicketPage = ({ ticket }) => {

    const classes = useStyles();

    const dateStr = getFormatedMovieDate(ticket.moviedate)


    return <BasePrintPage theme={getPrintTheme()} >
        <Container fixed className={classes.printContainer} >
            <Box className={classes.main}>
                <img className={classes.ticketLogo} src="/static/images/rkz-bios-ticket-logo.svg" />
                <Box className={classes.ticketInfoContainer}>
                    <Box>
                        <H1>{ticket.movieTitle}</H1>
                        <Box>{dateStr}</Box>
                        <Box>{ticket.seatType}</Box>
                        <Box>{ticket.paymentType}</Box>
                        <Box>Nr: {ticket.ticketNumber}</Box>
                        <Box>Code: {ticket.code}</Box>
                    </Box>
                    <QRCode value={ticket.qrCode} size={180} />
                </Box>
            </Box>
        </Container>
    </BasePrintPage>
}




PrintTicketPage.getInitialProps = async function ({ res, query: { ticketId, token } }) {

    //   const ticket = await movieApi.getTicket(ticketId, token),

    const ticket = {
        "code": "ERZV",
        "ticketNumber": "23",
        "seatType": "Duoseat",
        "paymentType": "Strippenkaart",
        "movieDateId": "12",
        "moviedate": "2019-11-29T20:30:00Z",
        "movieTitle": "Jojo Rabit",
        "qrCode": "ERZV"
    }

    return {
        ticket
    }

}

export default PrintTicketPage;
