import  Toolbar  from '@mui/material/Toolbar'
import React from 'react'

export default function UiToolbar(props) {
  return (
    <Toolbar {...props}>
        {props.children}
    </Toolbar>
  )
}
