import React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';


import { makeStyles } from '@material-ui/core/styles';


const baseBlock = {
    minHeight: 400,
    paddingTop: 60,
    paddingBottom: 60,
}

const useStyles = makeStyles(theme => ({



    consultancy: {
        backgroundColor: theme.palette.myblocks.consultancy,
        color: "#fff",
        ...baseBlock
    },


    inhousedevelopment: {
        background: "linear-gradient(#fdcc52, #fdc539)",
        ...baseBlock

    },
    fullServices: {
        backgroundColor: "#fff",
        ...baseBlock

    },
    storytrails: {
        background: `url(/static/img/bg-pattern.png), linear-gradient(to left, #fd2802, #ff7b00)`,
        ...baseBlock
    },
    unknownService: {
        backgroundColor: "#fff",
        ...baseBlock
    },
    fullPage: {
        backgroundColor: "green",
        paddingTop: 40,
        paddingBottom: 40,
        height: "100vh"
    },
    contactPage: {
        background:"linear-gradient(#fdcc52, #fdc539)",
        paddingTop: 40,
        paddingBottom: 40,
        height: "100vh"
    },
    wePage: {
        background: `url(/static/img/bg-pattern.png), linear-gradient(to left, #fd2802, #ff7b00)`,
        paddingTop: 40,
        paddingBottom: 40,
        height: "100vh"
    },
    default: {
        paddingTop: 40,
        paddingBottom: 40,
        backgroundColor: "white",
    }
}));


const BaseBoxContainer = (props) => {

    const classes = useStyles();

  

    return <Box className={classes[props.serviceType]} >
        <Container maxWidth="lg">
            {props.children ?  props.children : null}
        </Container>
    </Box>
}

export default BaseBoxContainer;