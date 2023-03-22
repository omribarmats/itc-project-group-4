import Card  from '@mui/material/Card'
import React from 'react'

export default function UiCard({...props}) {
  return (
    <Card {...props} >
        {props.children}
    </Card>
  )
}
