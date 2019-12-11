import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import Link from './Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { getMoviePosterUrl, getUrlEncodedStr, getMovieDatesStrShort } from './utils';






const MovieCard = (props) => {
    const movie = props.movie;
    const moviePosterUrl = getMoviePosterUrl(movie);
    const movieNameEncoded = getUrlEncodedStr(movie.title);
    const datesStrings = getMovieDatesStrShort(movie.movieDates)

    return <Box className={props.classes.movieCard}>
        <Link className={props.classes.movieCardLink} as={`/movie/${movieNameEncoded}/${movie.id}`} href={`/movie?id=${movie.id}&name=${movieNameEncoded}`}>
            <img className={props.classes.movieCardImage}  src={moviePosterUrl} />
            <Box className={props.classes.movieCardDates}>
                {datesStrings.map(dateStr => <div>{dateStr}</div>)}
            </Box>
        </Link>
    </Box>
}


const MovieList = (props) => {



    const movieItems = props.movies.map(movie => {
        return (<Grid item xs={6} md={12}>
            <MovieCard classes={props.classes} key={movie.id} movie={movie} />

        </Grid>);

    });

    return <Grid container>
        {movieItems}
    </Grid>


}

export default MovieList;