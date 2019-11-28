import React from 'react';
import Typography from '@material-ui/core/Typography';



export const H1 = (props) => {
    return <Typography variant="h1" component="h1" gutterBottom>{props.children}</Typography>
}

export const Body1 = (props) => {
    return  <Typography  variant="body1" >{props.children}</Typography>
}