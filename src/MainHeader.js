import React from 'react';
import Typography from '@material-ui/core/Typography';

const MainHeader = (props) => {
  
  return <Typography align="center" gutterBottom variant="h2" component="h1" gutterBottom={true}>
                  - {props.title} -
        </Typography>
}


export default MainHeader;
