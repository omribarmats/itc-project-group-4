import  CardContent  from '@mui/material/CardContent'
import React from 'react'

export default function UiCardContent({...props}) {
  return (
    <CardContent {...props} >
        {props.children}
    </CardContent>
  )
}
