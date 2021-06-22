import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { motion } from "framer-motion";


import BasePageLayout from "../src/BasePageLayout";
import MovieList from "../src/MovieList";
import { H1, Body1 } from "../src/Typo";
import { toFullMediaUrl, getMoviePosterUrl } from '../src/utils';
import movieApi from '../src/movieApi';



const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 40
  },
  image: {
    width: "100%"
  },
  movieContainer: {
    borderRadius: 3,
    background: 'rgba(0, 0, 0, 0.85)'
  },
  bodyParagraph: {
    color: "lightgrey",
  },
}));


const toStringWithLineBreaks = (value) => {
  return value.split('\n').map((item, key) => {
    return <React.Fragment key={key}>{item}<br /></React.Fragment>
  })
}

const Heading = (props) => {
  return (<H1>
      {props.block.value}
      </H1>);
}

const BodyParagraph = (props) => {
  const value = toStringWithLineBreaks(props.block.value);
  return (
    <p className={props.classes.bodyParagraph} >{value}</p>
  )
}

const Image = (props) => {
  return <img className={props.classes.image}  src={toFullMediaUrl(props.block.value)} />
}

const RichContent = (props) => {
  return <div dangerouslySetInnerHTML={{ __html: props.block.value }}></div>;
}


const typeToComponentMap = {
  paragraph: BodyParagraph,
  heading: Heading,
  image: Image,
  richContent: RichContent
}

const PageBody = (props) => {
  return props.body.map((element, i) => {
      const Component = typeToComponentMap[element.type];
      if (Component) {
          return (<Component key={i} classes={props.classes} block={element} />);
      } else {
          return null;
      }
  })
}


const Page = (props) => {
  const classes = useStyles();
  const backgroundImageUrl = toFullMediaUrl(props.page.pageBackDrop.meta.download_url);

  return (
    <BasePageLayout backgroundImage={backgroundImageUrl} clases={classes} pageTitle={props.page.title} mainMenuItems={props.mainMenuItems} >
      <Container maxWidth="lg">
        <Grid container spacing={4} className={classes.movieContainer}>
          <Grid item xs={12} md={10}>
            <motion.div
              animate={{ scale: [0.9, 1] }}
              transition={{ duration: 0.5 }}
            >
             <PageBody classes={classes} body={props.page.body} />

            </motion.div>
          </Grid>
          <Grid item xs={12} md={2}>
            <MovieList classes={classes} movies={props.activeMovies.items} />
          </Grid>
        </Grid>
      </Container>
    </BasePageLayout>
  )
}


Page.getInitialProps = async function  ({res, query: { path, id } }) {
  let [
    page,
    activeMovies,
    mainMenuItems
  ] = await Promise.all([
    await movieApi.getPage(id),
    await movieApi.getMovies({}),
    await movieApi.getMainMenu()
  ]);
  return {
    page,
    activeMovies,
    mainMenuItems
  }
}

export default Page;