import Collapse from '@mui/material/Collapse'
import React from 'react'

export default function UiCollapse({...props}) {
  return (
    <Collapse {...props} >
        {props.children}
    </Collapse>
  )
}
