import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';


/*
font-family: 'Catamaran', 'Helvetica', 'Arial', 'sans-serif';
    font-weight: 200;
    letter-spacing: 1px;
    */


// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: red,
    myblocks: {
      consultancy: "#1da1f2"
    }
  },
  
  typography: {
    fontSize: 16,
    fontFamily: [
      '"Lato"',
      'sans-serif',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    a: {
      color: "white",
    },

    h1: {
      fontSize: 40,
      fontWeight: 700,
      fontFamily: ['Lato', 'Helvetica', 'Arial', 'sans-serif'].join(','),
      lineHeight: 1.0,
      letterSpacing: 1.0
    },

    h2: {
      fontSize: 28,
      fontWeight: 900,
      fontFamily: ['"Raleway"','sans-serif'].join(','),
      lineHeight: 1.0
    },
    h3: {
      fontSize: 20,
      fontWeight: 900,
      fontFamily: ['"Raleway"','sans-serif'].join(','),
      lineHeight: 1.0
    },
    subtitle1: {
      fontSize: 36,
      fontWeight: 900,
      fontFamily: ['"Raleway"','sans-serif'].join(','),
      lineHeight: 1.0
    },
    h4: {
      fontSize: 16,
      fontWeight: 900,
      fontFamily: ['"Raleway"','sans-serif'].join(','),
      lineHeight: 1.0
    },
  },
  
  
});

export default theme;
