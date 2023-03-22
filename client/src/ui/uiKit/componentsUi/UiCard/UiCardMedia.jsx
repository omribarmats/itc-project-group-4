import  CardMedia  from '@mui/material/CardMedia'
import React from 'react'

export default function UiCardMedia({...props}) {
  return (
    <CardMedia {...props} >
        {props.children}
    </CardMedia>
  )
}
