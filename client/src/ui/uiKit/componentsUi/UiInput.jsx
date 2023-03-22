import  Input  from '@mui/material/Input'
import  Checkbox from '@mui/material/Checkbox'
import React from 'react'

export default function UiInput({...props}) {
  return (
    <Input {...props} >
        {props.children}
    </Input>
  )
}
