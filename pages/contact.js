import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BasePageLayout from "../src/BasePageLayout";
import BaseBoxContainer from "../src/BaseBoxContainer";


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


import { H1, Body1 } from "../src/Typo";


const useStyles = makeStyles(theme => ({

    
}));



const PropertyRow = (props) => {
  return  <React.Fragment>
    <Grid item xs={6} md={6}>
      <Typography variant="caption" component="span">                        
    {props.label}:
    </Typography>
    </Grid>
    <Grid item xs={6} md={6}>
    {props.value ?  props.value : props.children}
    </Grid>
    </React.Fragment>
}


export default function ContactPage() {
    const classes = useStyles();
    return (
        <BasePageLayout pageTitle="Contact">
            <BaseBoxContainer serviceType="contactPage">
                <H1>Contact gegevens</H1>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6}>
                      <Card>
                        <CardHeader title="Knowlogy" />
                        <CardContent>
                        <Grid container spacing={8}>
                          <PropertyRow label="Straat" value="Zuiderkerkstraat 10-1" />
                          <PropertyRow label="Postcode, plaats" value="9712 PZ Groningen" />
                          <PropertyRow label="Telefoon" value="+31 (0)50 2103567" />
                          <PropertyRow label="Email"><a href="mailto:info@knowlogy.nl">info@knowlogy</a></PropertyRow>
                          <PropertyRow label="KvK nummer" value="02085761 0000" />
                          <PropertyRow label="Bankrekeningnr nummer " value="NL92 RABO 0380 3119 25" />
                          <PropertyRow label="BTW nummer" value="NL8190.59.158.B01" />
                          </Grid>
                        </CardContent>
                      </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                       <Card>
                        <CardHeader title="Locatie" />
                        <CardContent>
                        <iframe 
                          scrolling="no" 
                          marginHeight="0" 
                          marginWidth="0" 
                          src="http://maps.google.nl/maps?q=knowlogy+groningen&amp;hl=nl&amp;sll=53.22324,6.563024&amp;sspn=0.024292,0.04824&amp;ie=UTF8&amp;view=map&amp;cid=16105028392359567265&amp;hq=knowlogy+groningen&amp;hnear=&amp;source=embed&amp;ll=53.22324,6.563024&amp;spn=0.01799,0.039482&amp;z=14&amp;iwloc=A&amp;output=embed" 
                          width="100%" 
                          height="350" frameBorder="0">

                        </iframe>
                        </CardContent>
                      </Card>
                  </Grid>
                  
                </Grid>
            </BaseBoxContainer>
        </BasePageLayout>
    );
}

//<Portfolio classes={classes} />