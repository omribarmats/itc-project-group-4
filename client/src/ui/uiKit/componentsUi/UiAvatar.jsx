import  Avatar  from '@mui/material/Avatar'
import React from 'react'


export default function UiAvatar({...props}) {
  return (
    <Avatar {...props} >
        {props.children}
    </Avatar>
  )
}
