import  TextField from '@mui/material/TextField'
import React from 'react'

export default function UiTextField({...props}) {
  return (
    <TextField {...props} >
        {props.children}
    </TextField>
  )
}
