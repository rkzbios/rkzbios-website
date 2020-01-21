import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import YoutubeEmbedVideo from 'youtube-embed-video';







const useStyles = makeStyles(theme => ({

   
}));


const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });


const parseYoutubeUrl = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}  

const MovieTrailerDialog = (props) => {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    let youtubeId = ""
    if (props.url){
        youtubeId = parseYoutubeUrl(props.url)
    }


    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Trailer
            </DialogTitle>
            <YoutubeEmbedVideo videoId={youtubeId} suggestions={false} />
        </Dialog>
    );
}

export default MovieTrailerDialog;