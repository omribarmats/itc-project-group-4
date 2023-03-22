import  AppBar  from '@mui/material/AppBar'
import React from 'react'

export default function UiAppBar(props) {
  return (
    <AppBar {...props}>
        {props.children}
    </AppBar>
  )
}
