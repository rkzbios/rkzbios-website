import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from "@material-ui/core/Box";
import MovieDate from "./MovieDate";

const useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      alignItems: "baseline"
    },
    item: {
      width: "100%"
    },
    title: {
      
      fontSize: 40,
      fontWeight: 700,
      fontFamily: ['Lato', 'Helvetica', 'Arial', 'sans-serif'].join(','),
      paddingRight: 8
    }
  
}));

const MovieTitleDate = ({title, date}) => {
    const classes = useStyles();
    return (<Box className={classes.container}>
            <Box className={classes.title}>
                {title}
            </Box>
            <Box className={classes.item}>
                <MovieDate date={date} />
            </Box>
        </Box>);
}


export default MovieTitleDate;