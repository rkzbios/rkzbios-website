import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import Link from './Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const sections = [
    // { name: 'Home', page: "/" },
    // { name: 'Zaalverhuur', page: "/zaalverhuur" },
    // { name: 'Over Ons', page: "/overons" },
    // { name: 'Contact', page: "/contact" }
];



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
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
        color: "red"
    },
    clarification: {
        fontFamily: "Oswald,sans-serif",
        fontSize: "0.8em",
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
                <Grid item md={4} xs={12}>

                    <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                        {sections.map(section => (
                            <Link
                                color="inherit"
                                noWrap
                                key={section.name}
                                variant="body2"
                                as={section.page}
                                href={section.page}
                                className={classes.toolbarLink}
                            >
                                {section.name}
                            </Link>
                        ))}
                    </Toolbar>
                </Grid>
                <Grid className={classes.clarification} item md={5} xs={12}>
                    <div>entree €7,- | 10-rittenkaart €50,- | studenten/stadjerspas €5,-</div>
                    <div>de kassa opent 30 minuten voor aanvang | pinnen en/of reserveren is niet mogelijk</div>
                </Grid>
            </Grid>
        </Container>
    </Box>
}

export default SiteMenu;