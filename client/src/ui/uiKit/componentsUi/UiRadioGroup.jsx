import  RadioGroup  from '@mui/material/RadioGroup'
import React from 'react'

export default function UiRadioGroup({...props}) {
  return (
    <RadioGroup {...props} >
        {props.children}
    </RadioGroup>
  )
}
