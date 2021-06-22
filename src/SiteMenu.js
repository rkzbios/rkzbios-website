import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import Link from './Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme => ({
    root: {
        // backgroundColor: "#000",
        marginTop: 32,
        marginBottom: 32
    },
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        //paddingRight: theme.spacing(1),       
        flexShrink: 0,
        color: "red",
        '&:hover': {
            background: 'red',
            color: 'white',
            textDecoration: 'none'
        },
        borderRadius: 4,
        textDecoration: 'none'
    },
    clarification: {
        fontFamily: "Oswald,sans-serif",
        fontSize: "0.8em",
        textAlign: "right"
    },
    link: {
        color: "red"
    }
}));

const SiteMenu = (props) => {
    const classes = useStyles();
    return <Box className={classes.root} >
        <Container component="nav" maxWidth="lg">
            <Grid container>
                <Grid item md={3} xs={12}>
                    <Link as={`/`} href={`/index`}>
                        <img src="/static/images/rkzbios-logo-300.png" alt="RKZ Bios" title="RKZ Bios" />
                    </Link>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                        {props.mainMenuItems.map( (menuItem) => (
                            <Link
                                color="inherit"
                                noWrap
                                key={menuItem.slug}
                                variant="body2"
                                as={`/page/${menuItem.slug}/${menuItem.id}`} 
                                href={`/page/${menuItem.slug}?id=${menuItem.id}`}
                                className={classes.toolbarLink}
                            >
                                {menuItem.title}
                            </Link>
                        ))}
                    </Toolbar>
                </Grid>
                <Grid className={classes.clarification} item md={3} xs={12}>
                    <div>entree €7,- | 10-rittenkaart €50,- | studenten/stadjerspas €5,-</div>
                    <div>de kassa opent 30 minuten voor aanvang | tickets alleen online</div>
                    <div>email: <a className={classes.link} href="mailto:info@rkzbios.nl">info@rkzbios.nl</a> </div>
                </Grid>
            </Grid>
        </Container>
    </Box>
}

export default SiteMenu;