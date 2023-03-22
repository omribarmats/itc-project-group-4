import  Button  from '@mui/material/Button'
import React from 'react'


export default function UiButton({...props}) {
  return (
    <Button {...props} >
        {props.children}
    </Button>
  )
}
