/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles';

import {
  Checkboxes,
  CheckboxData,
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


const useStyles = makeStyles(theme => ({

  formContainer: {
    borderRadius: 3,
    padding: 24,
    background: 'rgba(60, 60, 60, 0.95)',
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



// const initialValues= {
//   terms: false,
//   email: '',
//   emailVerification: '',
//   paymentType: 'normal',

// };




const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
)

const Overview = ({ name, toDisplayValue }) => (
  <Field
    name={name}
    subscribe={{ touched: true }}
    render={({ input: { value } }) =>
      <span>{toDisplayValue ? toDisplayValue(value) : value}</span>
    }
  />
)


const required = value => (value ? undefined : 'Required')



const validateTicketPayment = makeValidate(ticketPaymentSchema);
const requiredTicketPayment = makeRequired(ticketPaymentSchema);



const paymentTypeData = [
  { label: 'Normaal', value: 'normal' },
  { label: 'StrippenKaart', value: 'strippenkaart' },
  { label: 'Bioscoop pas', value: 'bioscooppas' },
  { label: 'Stadjespas (korting 2 euro)', value: 'stadjespas' },
  { label: 'Studentenpas (korting 2 euro)', value: 'studentenpas' },
  { label: 'Lid vereniging RKZ (korting 2 euro)', value: 'rkzmember' },
];


const valueToLabel = (labelValueArray) => {

  return (value) => {

    const valueLabel = labelValueArray.find(nameValue => nameValue.value == value)
    if (valueLabel) {
      return valueLabel.label
    }
    return null;
  }
}


const paymentTypeToLabel = valueToLabel(paymentTypeData);


const initialValuesSingleSeat = {
  terms: true,
  email: 'robert.hofstra@gmail',
  emailVerification: 'robert.hofstra@gmail',
  paymentTypes: ['normal']
};

const initialValuesDoubleSeat = {
  terms: true,
  email: 'robert.hofstra@gmail',
  emailVerification: 'robert.hofstra@gmail',
  paymentTypes: ['normal', 'normal']
};



const TicketsForm = (props) => {


  const classes = useStyles();


  
  const initialValues = Number(props.nrOfSeats) === 1 ? initialValuesSingleSeat : initialValuesDoubleSeat;

  console.log("tf ", props)


  return <div className={classes.formContainer}>
    <h1>{props.movieTitle} {props.movieDate} </h1>

    <Wizard
      initialValues={initialValues}
      onSubmit={onSubmit}
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
      <Wizard.Page>
        <Grid container spacing={4} className={classes.movieContainer}>
          <Grid item xs={6}>
            Email:
          </Grid>
          <Grid item xs={6} >
            <Overview name="email" />
          </Grid>
          <Grid item xs={6}>
            Betaal optie:
          </Grid>
          <Grid item xs={6} >
            <Overview name="paymentTypes" toDisplayValue={paymentTypeToLabel} />
          </Grid>
        </Grid>
      </Wizard.Page>

    </Wizard>
  </div>
}

export default TicketsForm;