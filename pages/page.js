import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


import BasePageLayout from "../src/BasePageLayout";


import { H1, Body1 } from "../src/Typo";
import { Box } from '@material-ui/core';

import { motion } from "framer-motion";

import movieApi from '../src/movieApi';

const styles = {
  background: "blue",
  borderRadius: 30,

  margin: "auto"
};

const BodyBlockQuoute = (props) => {
  return (<blockquote class="groucho">
    {props.body.text}
    <footer>{props.body.test}</footer>
  </blockquote>);
}

const BodyParagraph = (props) => {
  return (
    <p>{props.block.value}</p>
  )
}


const typeToComponentMap = {
  paragraph: BodyParagraph
}

const MovieBody = (props) => {

  return props.body.map(element => {
    const Component = typeToComponentMap[element.type];
    if (Component) {
      return (<Component block={element} />);
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
  }

}));




const Content = (props) => {

  const movie = props.movie;
  const movieTitle = props.movie.title

  return (
    <Box>
      <H1>{movie.title}</H1>
     
    </Box>
  );
}

const toFullMediaUrl= (url) => {
  return `http://localhost:8000${url}`;
}


const Page = (props) => {
  const classes = useStyles();

  //const MovieSelectorNoSSR = dynamic(() => import('../src/MovieSelector'), { ssr: false });

  const backgroundImageUrl = null

  return (

    <BasePageLayout backgroundImage={backgroundImageUrl} clases={classes} pageTitle="Home">

      <Container maxWidth="lg">
        <Grid container spacing={4} className={classes.movieContainer}>

          <Grid item xs={12} md={6}>
            <motion.div

              animate={{ scale: [0.9, 1] }}
              transition={{ duration: 0.5 }}
            >
             
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            
          </Grid>

        </Grid>
      </Container>
      <Container maxWidth="lg">

      </Container>


    </BasePageLayout>
  )

}


Page.getInitialProps = async function () {


  let [
    currentMovie,
    activeMovies,
  ] = await Promise.all([
    await movieApi.getCurrentMovie(),
    await movieApi.getMovies({})
  ]);


  return {
    currentMovie,
    activeMovies
  }

}

//export default withApollo( ProvideHomePage);
export default Page;
