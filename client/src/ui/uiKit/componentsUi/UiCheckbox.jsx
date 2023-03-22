import  Checkbox from '@mui/material/Checkbox'
import React from 'react'

export default function UiCheckbox({...props}) {
  return (
    <Checkbox {...props} >
        {props.children}
    </Checkbox>
  )
}
