import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import BasePageLayout from "../src/BasePageLayout";


import { H1, Body1 } from "./Typo";
import { Box } from '@material-ui/core';

import MovieList from "./MovieList";

import { motion } from "framer-motion";

import { toFullMediaUrl, getMoviePosterUrl } from '../src/utils';

import { getMovieDatesStr, toReleaseDateStr } from "./utils";

const styles = {
    background: "blue",
    borderRadius: 30,

    margin: "auto"
};

const BodyBlockQuoute = (props) => {
    return (<blockquote class="groucho">
        {props.block.value.text}
        <footer>{props.block.value.author}</footer>
    </blockquote>);
}

const BodyParagraph = (props) => {
    return (
        <p>{props.block.value}</p>
    )
}


const typeToComponentMap = {
    paragraph: BodyParagraph,
    quotation: BodyBlockQuoute
}

const MovieBody = (props) => {

    return props.body.map(element => {
        const Component = typeToComponentMap[element.type];
        if (Component) {
            return (<Component classes={props.classes} block={element} />);
        } else {
            return null;
        }
    })
}



const useStyles = makeStyles(theme => ({

    button: {
        marginTop: 40
    },

    posterImage: {
        width: "100%"
    },

    movieContainer: {
        borderRadius: 3,
        background: 'rgba(0, 0, 0, 0.85)'
    },

    movieContent: {
        marginLeft: 16,
        marginRight: 16
    },

    movieList: {
        marginTop: 40
    }


}));



const SimpleDialog = (props) => {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = value => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Trailer</DialogTitle>
            
        </Dialog>
    );
}



const PosterImage = (props) => {

    const classes = useStyles();
    return (
        <img className={classes.posterImage} src={props.src}></img>
    );
}


const MovieContent = (props) => {

    const movie = props.movie;
    const datesStrings = getMovieDatesStr(movie.movieDates)

    const externalLinks = movie.externalLinks ? movie.externalLinks.map(externalLink => {
        return <div><a target="_blank" href={externalLink.linkExternal}>Meer informatie op {externalLink.typeLink}</a> </div>
    }) : null;

    return (
        <Box className={props.classes.movieContent}>
            <H1>{movie.title}</H1>
            <MovieBody classes={props.classes} body={movie.body} />
            {datesStrings.map(dateStr => <div>{dateStr}</div>)}
            <div>{movie.director} {movie.country}</div>
            {movie.premiere ? <div>Premiere in Groningen</div> : null}
            {movie.movieType ? <div>{movie.movieType}</div> : null}
            {movie.minimumAge ? <div>Minimale leeftijd {movie.minimumAge}</div> : null}
            <div>
                {movie.spokenLanguage ? <span>{movie.spokenLanguage}</span> : null}  {movie.subtitleLanguage ? <span>{movie.subtitleLanguage}</span> : null}
            </div>
            {movie.lengthInMinutes ? <div>Duur {movie.lengthInMinutes} minuten</div> : null}
            {externalLinks}
            {movie.releaseDate ? <div>{toReleaseDateStr(movie.releaseDate)}</div> : null}
            <Button variant="outlined" color="primary" onClick={props.handleClickOpen}>
                        Open trailer
            </Button>
        </Box>
    );
}



const MoviePageBase = (props) => {
    const classes = useStyles();

    //const MovieSelectorNoSSR = dynamic(() => import('../src/MovieSelector'), { ssr: false });

    const movie = props.currentMovie;
    const posterUrl = getMoviePosterUrl(props.currentMovie);
    const backgroundImageUrl = toFullMediaUrl(props.currentMovie.movieBackDrop.meta.download_url);


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = value => {
        setOpen(false);
        
    };

    return (

        <BasePageLayout backgroundImage={backgroundImageUrl} clases={classes} pageTitle="Home">

            <SimpleDialog  open={open} onClose={handleClose} />

            <Container maxWidth="lg">
                <Grid container className={classes.movieContainer}>

                <Grid item xs={12} md={6}>
                    <motion.div

                        animate={{ scale: [0.9, 1] }}
                        transition={{ duration: 0.5 }}
                    >
                        <PosterImage src={posterUrl} />
                    </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <MovieContent classes={classes} movie={movie} handleClickOpen={handleClickOpen} />
                </Grid>
                <Grid item xs={12} md={12} style={{marginLeft: 16}}>
                    <div>entree €7,- | 10-rittenkaart €50,- | studenten/stadjerspas €5,-</div>
                    <div>de kassa opent 30 minuten voor aanvang | pinnen en/of reserveren is niet mogelijk | </div>
                </Grid>
                <Grid item xs={12} md={12} style={{marginLeft: 16}}>
                    <h2>Agenda</h2>
                </Grid>
                <MovieList classes={classes} movies={props.activeMovies.items} />
            </Grid>
               
            </Container>
        <Container maxWidth="lg">

        </Container>


        </BasePageLayout >
    )

}

export default MoviePageBase;
