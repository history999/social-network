import React from 'react'
import { Field } from 'redux-form';


export default function HOCField(nameField, componentFieldControl, placeholder, props = {}) {

  return <Field  name={nameField} component={componentFieldControl} placeholder={placeholder}  {...props} />
}
