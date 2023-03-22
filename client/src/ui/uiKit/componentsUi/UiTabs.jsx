import Tabs  from '@mui/material/Tabs'
import React from 'react'

export default function UiTabs({...props}) {
  return (
    <Tabs {...props} >
        {props.children}
    </Tabs>
  )
}
