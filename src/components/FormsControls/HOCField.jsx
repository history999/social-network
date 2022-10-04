import React from 'react'
import { Field } from 'redux-form';
import { lengthRequired, required } from './../validators/validators';

const lengthRequired20 = lengthRequired(20)

export default function HOCField(nameField, componentFieldControl, placeholder, props = {}) {
  

  return <Field validate={[lengthRequired20]}  name={nameField} component={componentFieldControl} placeholder={placeholder} {...props} />
}
