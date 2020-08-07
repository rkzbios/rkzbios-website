import { createMuiTheme } from '@material-ui/core/styles';

export const getPrintTheme = () => {

  return (theme) => {



    const createdTheme = createMuiTheme({
      ...theme,
      palette: {
        type: 'light',
        primary: {main:"#000000"},
        
      },
      typography: {
        h3: {
          fontSize: "13pt",
         
        },
        h1: {
          fontSize: "14pt",
          fontWeight: 900,
          fontFamily: ['Lato', 'Helvetica', 'Arial', 'sans-serif'].join(','),
          lineHeight: 1.0,
          letterSpacing: 1.0
        },
        body1: {
          fontSize: "10pt",
          
        },
        body2: {
          fontSize: "8pt",
          
        }
      }
    })

    return createdTheme;


  }
}