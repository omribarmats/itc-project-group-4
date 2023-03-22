import  DialogContent from '@mui/material/DialogContent'
import React from 'react'


export default function UiDialogContent({...props}) {
  return (
    <DialogContent {...props} >
        {props.children}
    </DialogContent>
  )
}
