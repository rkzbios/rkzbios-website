import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

    posterImage: {
        width: "100%"
    },
    playButton: {
        position: 'absolute',
        top: '50%',
        right: '50%',
        width: 90,
        height: 90,
        marginTop: -45,
        marginRight: -45,
        '&:hover': {
            transform: 'scale(1.3)'
        },
    },
    posterContainer: {
        position: 'relative'
    }

}));



const PosterImage = ( { src, showPlayButton, onPlayClick}) => {

    const classes = useStyles();
    return <div className={classes.posterContainer}>
        <img className={classes.posterImage} src={src}>
        </img>
        {showPlayButton ? <img
            className={classes.playButton}
            src="/static/images/play-white.png"
            onClick={() => onPlayClick()}
        ></img> : null}
    </div>
}

export default PosterImage;