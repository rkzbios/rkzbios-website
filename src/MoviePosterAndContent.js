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
import PosterImage from "./PosterImage";
import MovieContent from "./MovieContent";

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



// const useStyles = makeStyles(theme => ({

//     button: {
//         marginTop: 40
//     },


//     quote: {
//         fontStyle: "italic",
//         marginTop: 16,
//     },
//     quoteFrom: {
//         fontStyle: "normal",
//     },

//     bodyParagraph: {
//         color: "lightgrey",
//     },

//     movieContainer: {
//         borderRadius: 3,
//         background: 'rgba(0, 0, 0, 0.85)'
//     },

//     movieContent: {
//         marginLeft: 16,
//         marginRight: 16,
//         marginBottom: 16
//     },

//     movieType: {
//         fontFamily: "Oswald,sans-serif",
//         color: "#00FC87",
//         fontSize: "1.3em",
//         textTransform: "capitalize",
//         marginTop: 16
//     },
//     movieDirectorCountry: {
//         fontFamily: "Oswald,sans-serif",
//         fontSize: "1.1em",
//         textTransform: "capitalize",
//         marginTop: 0
//     },

//     movieList: {
//         marginTop: 40
//     },
//     externalLinks: {
//         marginTop: 16
//     },
//     externalLink: {
//         color: "white",
//     },

//     labelBox: {
//         marginTop: 16
//     },

//     labelName: {
//         fontFamily: "Oswald,sans-serif",
//         fontSize: "1.0em",

//     },
//     labelValue: {
//         fontFamily: "Oswald,sans-serif",
//         color: "#00FC87",
//         fontSize: "1.3em",

//     },
//     movieDates: {
//         fontFamily: "Oswald,sans-serif",
//         color: "#00FC87",
//         fontSize: "1.0em",
//     },
//     doubleBill: {
//         marginBottom: 16,
//         marginTop: 16
//     },
//     classification: {
//         backgroundColor: "white"
//     },
//     classificationBox: {
//         display: "inline",
//         marginRight: 8
//     },
//     classificationImage: {
//         width: "1.5em",
//         height: "1.5em",
//     },
//     playButton: {
//         position: 'absolute',
//         top: '50%',
//         right: '50%',
//         width: 90,
//         height: 90,
//         marginTop: -45,
//         marginRight: -45,
//         '&:hover': {
//             transform: 'scale(1.3)'
//         },
//     },
//     posterContainer: {
//         position: 'relative'
//     },
//     ticketButton: {
//         fontSize: "0.5em",
//         margin: theme.spacing(1),
//     }

// }));


const MoviePosterAndContent = ({ classes, movie }) => {
    const [open, setOpen] = React.useState(false);
    const posterUrl = getMoviePosterUrl(movie);
    const trailer = movie.trailer ? movie.trailer : null;
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const showPlayButton = trailer ? true : false;

    return <Grid item md={10} xs={12} container className={classes.movieContainer}>
       {trailer ? <MovieTrailerDialog url={trailer} open={open} onClose={handleClose} /> : null}
        <Grid item xs={12} md={6}>
            <motion.div
                animate={{ scale: [0.9, 1] }}
                transition={{ duration: 0.5 }}>
                <PosterImage src={posterUrl} showPlayButton={showPlayButton} onPlayClick={handleClickOpen} />
            </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
            <MovieContent classes={classes} movie={movie} />
        </Grid>
    </Grid>
}

export default MoviePosterAndContent;
