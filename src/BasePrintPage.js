import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({


    printBar: {
        '@media print' : {
             display: 'none'
        }
      },
}));



const BasePage = (props) => {


    const classes = useStyles();

 
    const maincontent = props.theme ?
    (<ThemeProvider theme={props.theme}>
        <main className={classes.main}>
            {props.children ? props.children : null}
        </main>
    </ThemeProvider>) :
    <React.Fragment>
        <main className={classes.main}>
            {props.children ? props.children : null}
        </main>
    </React.Fragment>;


    return (
        <React.Fragment>
          { maincontent }
        </React.Fragment>
    );
}

export default BasePage;
