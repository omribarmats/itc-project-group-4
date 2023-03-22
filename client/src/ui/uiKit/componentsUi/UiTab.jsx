import  Tab from '@mui/material/Tab'
import React from 'react'

export default function UiTab({...props}) {
  return (
    <Tab {...props} >
        {props.children}
    </Tab>
  )
}
