/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles';

import {
  Checkboxes,
  Radios,
  RadioData,
  makeValidate,
  makeRequired,
  TextField,
  Debug,
  SwitchData,
} from 'mui-rff';

import * as Yup from 'yup';


import Wizard from './Wizard'
import {paymentTypeData, paymentTypeToLabel} from './reservationUtils';

const useStyles = makeStyles(theme => ({

  formContainer: {
    '& .MuiFormControl-root': {
      margin: theme.spacing(1)
    },
  },

}));


const emailSchema = Yup.object().shape({
  terms: Yup.boolean().oneOf([true], 'U moet aan de voorwaarden voldoen').required(),
  email: Yup.string().required().email("U moet een correct email adres opgeven"),
  emailVerification: Yup.string().required().email("U moet een correct email adres opgeven"),
  paymentType: Yup.string().required(),
});


const ticketPaymentSchema = Yup.object().shape({
  terms: Yup.boolean().oneOf([true], 'U moet aan de voorwaarden voldoen').required(),
  email: Yup.string().required().email("U moet een correct email adres opgeven"),
  emailVerification: Yup.string().required().email("U moet een correct email adres opgeven"),
  paymentType: Yup.string().required(),
});



const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
)




const required = value => (value ? undefined : 'Required')
const validateTicketPayment = makeValidate(ticketPaymentSchema);
const requiredTicketPayment = makeRequired(ticketPaymentSchema);


const TicketsForm = (props) => {


  const classes = useStyles();

  return <div className={classes.formContainer}>

    <Wizard
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
    >
      <Wizard.Page
        validate={values => {
          const errors = {}
          if (!values.terms) {
            errors.terms = 'U moet voldoen aan de voorwaarden..'
          }
          return errors
        }}
      >
        <div>
          <div><p>Hierbij verklaar ik dat ik geen sympotomen en......</p></div>
          <Checkboxes
            name="terms"
            required={requiredTicketPayment.terms}
            data={{
              label: 'Ja dat verklaar ik',
              value: false,
            }}
          />
          <Error name="terms" />
        </div>
      </Wizard.Page>
      <Wizard.Page
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = 'Vereist'
          }
          if (!values.emailVerification) {
            errors.emailVerification = 'Vereist'
          }

          if (values.email && values.emailVerification && values.email !== values.emailVerification) {
            errors.emailVerification = 'Email adressen zijn niet hetzelfde'
          }
          return errors
        }}
      >
        <div>
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required={requiredTicketPayment.email}
            helperText="" />
          <TextField
            variant="outlined"
            label="Herhaal email"
            name="emailVerification"
            type="email"
            autoComplete="email"
            required={requiredTicketPayment.emailVerification}
            helperText="" />
          <FieldArray name="paymentTypes">
            {({ fields }) =>
              fields.map((name, index) => (
                <Radios
                  key={index}
                  label={`Strippenkaart/korting seat ${index + 1}`}
                  name={name}
                  required={true}
                  data={paymentTypeData}
                  helperText=""
                />
              ))
            }
          </FieldArray>


        </div>
      </Wizard.Page>


    </Wizard>
  </div>
}

export default TicketsForm;