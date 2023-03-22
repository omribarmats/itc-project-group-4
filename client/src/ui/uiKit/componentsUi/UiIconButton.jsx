import IconButton  from '@mui/material/IconButton'
import React from 'react'


export default function UiIconButton({...props}) {
  return (
    <IconButton {...props} >
        {props.children}
    </IconButton>
  )
}
