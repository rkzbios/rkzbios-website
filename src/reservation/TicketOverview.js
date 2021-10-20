import React, {useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { getPaymentTypesLabel, getSeatTypeLabel } from './reservationUtils';


const OverviewRow = ({label, value}) => {
  return <React.Fragment>
            <Grid item xs={6} md={6}>
                {label}
            </Grid>
            <Grid item xs={6} md={6}>
                 {value}
            </Grid>
  </React.Fragment>        
}

const TicketOverview = ({priceAndAvailability, ticketRequest, onPrevious, onCompleteTransaction}) => {
  const overViewWidget = <React.Fragment>
    
    <OverviewRow label="Prijs:" value={priceAndAvailability.noPayment ? "n.v.t": `${priceAndAvailability.price} €` } />
    <OverviewRow label="Email:" value={ticketRequest.email} />
    <OverviewRow label="Ticket soort:"  value={getPaymentTypesLabel(ticketRequest.paymentTypes)} />
  </React.Fragment>        
 
  const nextButtonLabel = priceAndAvailability.noPayment ? "Ticket bestellen" : "Naar de kassa"

  return (
        <Grid container spacing={4}>
            {overViewWidget}
            <Grid item xs={12} md={12}>
              <Button color="primary" onClick={()=> onPrevious()}>Vorige</Button>
              <Button variant="contained" color="primary" disableElevation onClick={()=> onCompleteTransaction()}>
                {nextButtonLabel}
              </Button>
            </Grid>
        </Grid>
  )
}




export default TicketOverview;