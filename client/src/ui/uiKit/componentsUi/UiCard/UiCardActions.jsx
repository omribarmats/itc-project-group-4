import  CardActions  from '@mui/material/CardActions'
import React from 'react'

export default function UiCardActions({...props}) {
  return (
    <CardActions {...props} >
        {props.children}
    </CardActions>
  )
}
