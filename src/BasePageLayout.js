import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';

import Head from 'next/head';

import SiteMenu from './SiteMenu';


//    height: 100vh; // for full browser height and no gradient break

const useStyles = makeStyles(theme => ({

  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.85) 15%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 1) 90%)',
    backgroundAttachment: 'fixed',
    margin: 0
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto'
  },

 }));



 function BuildWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      
      <Link color="inherit" href="https://knowlogy.nl/">
        RKZ bios
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const BasePageLayout = (props) => {

  const classes = useStyles();


  let backGroundStyle = {
    background: 'black',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover', 
    height: '100%'
  }
  if (true){
    backGroundStyle.backgroundImage = 'url(' + props.backgroundImage + ')';
  }



  return (
    <div style={backGroundStyle} >
    <div className={classes.root}>
      <Head>
        <title>{props.pageTitle}</title>
        <meta name="og:title" value={props.pageTitle} />
      </Head>
      <SiteMenu />
      {props.children ? props.children : null}
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <BuildWithLove />
        </Container>
      </footer>
    </div>
    </div>
  )
}


export default BasePageLayout;



