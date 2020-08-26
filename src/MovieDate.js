import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from "@material-ui/core/Box";

import { getMovieDatesStr, getFormatedMovieDate, toReleaseDateStr } from "./utils";


const useStyles = makeStyles(theme => ({

   
    movieDates: {
        fontFamily: "Oswald,sans-serif",
        color: "#00FC87",
        fontSize: "1.0em",
    }

}));

const MovieDate = ({date}) => {
    const classes = useStyles()
   
    const dateStr = date ? getFormatedMovieDate(date): "";
    return <Box className={classes.movieDates}>
        {dateStr}
    </Box>
}

export default MovieDate;