import Dialog from '@mui/material/Dialog'
import React from 'react'


export default function UiDialog({...props}) {
  return (
    <Dialog {...props} >
        {props.children}
    </Dialog>
  )
}
