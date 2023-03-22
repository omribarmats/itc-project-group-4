import FormControlLabel  from '@mui/material/FormControlLabel'
import  Checkbox from '@mui/material/Checkbox'
import React from 'react'

export default function UiFormControlLabel({...props}) {
  return (
    <FormControlLabel {...props} >
        {props.children}
    </FormControlLabel>
  )
}
