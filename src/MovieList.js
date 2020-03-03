import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Link from './Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import { getMoviePosterUrl, getUrlEncodedStr, getMovieDatesStrShort } from './utils';


const useStyles = makeStyles(theme => ({

    movieCard: {
        marginBottom: 16,
        backgroundColor: 'black'
    },
    movieCardDates: {
        marginTop: 8,
        marginBottom: 16,
        fontFamily: "Oswald,sans-serif",
        fontSize: "1.0em",
        textAlign: "center"
    },
    movieCardImage: {
        width: "100%",

    },
    movieCardLink: {
    }
}));


const ConstRatioImage = (props) => {

    const ratioPercentage = props.ratio * 100;
    return <div style={{
        display: "block",
        width: "100%",
        position: "relative",
        height: "0",
        padding: `${ratioPercentage}% 0 0 0`,
        overflow: "hidden",
    }}>
        <img style={{
            position: "absolute",
            display: "block",
            width: "100%",
            left: 0,
            right: 0,
            top: 0,
            margin: "auto"
        }} src={props.src} />
    </div>
}


const MovieCard = (props) => {

    const classes = useStyles();

    const movie = props.movie;
    const moviePosterUrl = getMoviePosterUrl(movie);
    const movieNameEncoded = getUrlEncodedStr(movie.title);
    const datesStrings = getMovieDatesStrShort(movie.movieDates)

    return <Grid className={classes.movieCard} key={props.akey} item xs={6}  md={12} alignContent="stretch" >
        <Link className={classes.movieCardLink} 
            as={`/movie/${movieNameEncoded}/${movie.id}`} 
            href={`/movie?id=${movie.id}&name=${movieNameEncoded}`}>
            <ConstRatioImage ratio={1.5} src={moviePosterUrl} />
            <Typography color="textPrimary" align="center" variant="button" display="block">
                {movie.title}
            </Typography>
            <Box className={classes.movieCardDates}>
                {datesStrings.map((dateStr, i) => <div key={i}>{dateStr}</div>)}
            </Box>
        </Link>
    </Grid>
}


const MovieList = (props) => {

    const movieItems = props.movies.map(movie => {
        return (<MovieCard key={movie.id} movie={movie} />);
    });

    return <Grid direction="row" container alignItems="stretch">
        {movieItems}
    </Grid>
}

export default MovieList;