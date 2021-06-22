export const paymentTypeData = [
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


export const paymentTypeToLabel = valueToLabel(paymentTypeData);



export const getPaymentTypesLabel = (paymentTypes) => {

  const paymentTypesNames = paymentTypes.map( paymentType => paymentTypeToLabel(paymentType));
  return paymentTypesNames.join(",")
}

export const getSeatTypeLabel = (nrOfSeatsStr) =>  {
  const nrOfSeats =  parseInt(nrOfSeatsStr);
  const value = nrOfSeats === 1 ? 'enkel': "duo seat";
  return value;
}