import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

//import Button from '@material-ui/core/Button';

import Button from './Button'

import BasePageLayout from "../src/BasePageLayout";

import MovieTrailerDialog from "./MovieTrailerDialog";

import { H1, Body1 } from "./Typo";
import { Box } from '@material-ui/core';

import MovieList from "./MovieList";
import MovieDate from './MovieDate';

import { motion } from "framer-motion";

import { toFullMediaUrl, getMoviePosterUrl } from '../src/utils';

import { getMovieDatesStr, getFormatedMovieDate, toReleaseDateStr } from "./utils";



const BodyBlockQuoute = (props) => {
    return (<Box className={props.classes.quote}>
        {props.block.value.text}
        <footer className={props.classes.quoteFrom}>{props.block.value.author}</footer>
    </Box>);
}

const BodyParagraph = (props) => {
    return (
        <p className={props.classes.bodyParagraph} >{props.block.value}</p>
    )
}


const typeToComponentMap = {
    paragraph: BodyParagraph,
    quotation: BodyBlockQuoute
}

const MovieBody = (props) => {

    return props.body.map((element, i) => {
        const Component = typeToComponentMap[element.type];
        if (Component) {
            return (<Component key={i} classes={props.classes} block={element} />);
        } else {
            return null;
        }
    })
}



const useStyles = makeStyles(theme => ({

    button: {
        marginTop: 40
    },


    quote: {
        fontStyle: "italic",
        marginTop: 16,
    },
    quoteFrom: {
        fontStyle: "normal",
    },

    bodyParagraph: {
        color: "lightgrey",
    },

    movieContainer: {
        borderRadius: 3,
        background: 'rgba(0, 0, 0, 0.85)'
    },

    movieContent: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16
    },

    movieType: {
        fontFamily: "Oswald,sans-serif",
        color: "#00FC87",
        fontSize: "1.3em",
        textTransform: "capitalize",
        marginTop: 16
    },
    movieDirectorCountry: {
        fontFamily: "Oswald,sans-serif",
        fontSize: "1.1em",
        textTransform: "capitalize",
        marginTop: 0
    },

    movieList: {
        marginTop: 40
    },
    externalLinks: {
        marginTop: 16
    },
    externalLink: {
        color: "white",
    },

    labelBox: {
        marginTop: 16
    },

    labelName: {
        fontFamily: "Oswald,sans-serif",
        fontSize: "1.0em",

    },
    labelValue: {
        fontFamily: "Oswald,sans-serif",
        color: "#00FC87",
        fontSize: "1.3em",

    },
    movieDates: {
        fontFamily: "Oswald,sans-serif",
        color: "#00FC87",
        fontSize: "1.0em",
    },
    doubleBill: {
        marginBottom: 16,
        marginTop: 16
    },
    classification: {
        backgroundColor: "white"
    },
    classificationBox: {
        display: "inline",
        marginRight: 8
    },
    classificationImage: {
        width: "1.5em",
        height: "1.5em",
    },


    ticketButton: {
        fontSize: "0.5em"
    }

}));





const MovieDateAndTickets = (props) => {


    return <React.Fragment>
        <Grid item xs={6}><MovieDate date={props.movieDate.date} /></Grid>
        <Grid container item xs={6}>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={props.classes.ticketButton}
                    href={`/tickets?movieId=${props.movie.id}&movieDateId=${props.movieDate.id}&nrOfSeats=1`}

                >
                    Koop Ticket
                </Button>

            </Grid>
            
        </Grid>
    </React.Fragment>

}


const MovieDatesAndTickets = (props) => {

    return <Grid container>
        {props.movie.movieDates.map((movieDate, i) => <MovieDateAndTickets classes={props.classes} movie={props.movie} movieDate={movieDate} key={i}></MovieDateAndTickets>)}
    </Grid>

}


const MovieDateAndTicketsT = (props) => {

    return <React.Fragment>
        <Grid item xs={6}><MovieDate date={props.movieDate.date} /></Grid>
    </React.Fragment>
}

const MovieDatesAndTicketsT = (props) => {

    return <Grid container className={props.classes.movieDates}>
        {props.movie.movieDates.map((movieDate, i) => <MovieDateAndTicketsT classes={props.classes} movie={props.movie} movieDate={movieDate} key={i} />)}
    </Grid>

}



const MovieContent = (props) => {

    const movie = props.movie;
    // const datesStrings = getMovieDatesStr(movie.movieDates)

    const isDoubleBill = movie.doubleBillMovie ? true : false;
    const doubleBillTitle = movie.doubleBillMovie ? "Double Feature, samen met " + movie.doubleBillMovie.title : null;


    const classifications = movie.classifications ? movie.classifications.map((classification, i) => {

        const classificationImageUrl = "/static/images/" + classification.icon;
        return <Box className={props.classes.classificationBox} key={i}>
            <img className={props.classes.classificationImage} src={classificationImageUrl} />
        </Box>
    }) : null;


    const externalLinks = movie.externalLinks ? movie.externalLinks.map((externalLink, i) => {
        return <Box key={i} className={props.classes.externalLinks}>
            <a className={props.classes.externalLink} target="_blank" href={externalLink.linkExternal}>Meer informatie op {externalLink.typeLink}</a>
        </Box>
    }) : null;

    return (
        <Box className={props.classes.movieContent}>
            <H1>{movie.title}</H1>
            {isDoubleBill ? <Box className={props.classes.doubleBill}>
                <Chip color="secondary" label={doubleBillTitle} icon={<FaceIcon />} />

            </Box> : null}

            <MovieDatesAndTickets classes={props.classes} movie={movie} />

            <MovieBody classes={props.classes} body={movie.body} />
            {movie.premiere ? <div>Premiere in Groningen</div> : null}
            {movie.movieType ? <Box className={props.classes.movieType}>{movie.movieType}</Box> : null}


            <Grid container className={props.classes.labelBox}  >
                <Grid item xs={6}>
                    <Box className={props.classes.movieDirectorCountry}>{movie.director} {movie.country}</Box>
                </Grid>
                <Grid item xs={6}>
                    {classifications}
                </Grid>
            </Grid>



            <Grid container className={props.classes.labelBox}  >
                <Grid item xs={6}>
                    <Box className={props.classes.labelName}>Duur</Box>
                    {movie.lengthInMinutes ? <Box className={props.classes.labelValue}>{movie.lengthInMinutes} minuten</Box> : null}
                </Grid>
                <Grid item xs={6}>
                    <Box className={props.classes.labelName}>Release</Box>
                    {movie.releaseDate ? <Box className={props.classes.labelValue}>{toReleaseDateStr(movie.releaseDate)}</Box> : null}
                </Grid>
            </Grid>

            {movie.minimumAge ? <div>Minimale leeftijd {movie.minimumAge}</div> : null}
            <Grid container className={props.classes.labelBox}  >
                <Grid item xs={6}>
                    <Box className={props.classes.labelName}>Taal</Box>
                    <Box className={props.classes.labelValue}>
                        {movie.spokenLanguage ? <span>{movie.spokenLanguage}</span> : null}
                    </Box>
                </Grid>
                {movie.subtitleLanguage ?
                    <Grid item xs={6}>
                        <Box className={props.classes.labelName}>Ondertiteling</Box>
                        <Box className={props.classes.labelValue}>
                            {movie.subtitleLanguage}
                        </Box>
                    </Grid>
                    : null}

            </Grid>

            <Box className={props.classes.labelBox}>
                {externalLinks}
            </Box>

        </Box>
    );
}

export default MovieContent;