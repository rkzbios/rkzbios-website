import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import Link from './Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { getMoviePosterUrl, getUrlEncodedStr, getMovieDatesStr } from './utils';





const useStyles = makeStyles(theme => ({

    root: {
        // backgroundColor: "#000",
        marginTop: 32,
        marginBottom: 32
    },

    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
        color: "red"
    },

}));

const MovieCard = (props) => {
    const movie = props.movie;
    const moviePosterUrl = getMoviePosterUrl(movie);
    const movieNameEncoded = getUrlEncodedStr(movie.title);
    const datesStrings = getMovieDatesStr(movie.movieDates)
  
    return <Link as={`/movie/${movieNameEncoded}/${movie.id}`} href={`/movie?id=${movie.id}&name=${movieNameEncoded}`}>
        <img style={{width: "100%"}} src={moviePosterUrl}/>
        <div>
         {datesStrings.map( dateStr => <div>{dateStr}</div> )}
        </div>
    </Link>
}


const MovieList = (props) => {

    const classes = useStyles();

    console.log(props.movies);

    const movieItems = props.movies.map( movie => {
        return (<Grid className={props.classes.movieList} item md={3}>
            <MovieCard movie={movie} />
                    
        </Grid>);
                
    } );

    return <Grid container spacing={4}>
                {movieItems}
            </Grid>
        
    
}

export default MovieList;