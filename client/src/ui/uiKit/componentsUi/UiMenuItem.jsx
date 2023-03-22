import  MenuItem from '@mui/material/MenuItem'
import React from 'react'

export default function UiMenuItem({...props}) {
  return (
    <MenuItem {...props} >
        {props.children}
    </MenuItem>
  )
}
