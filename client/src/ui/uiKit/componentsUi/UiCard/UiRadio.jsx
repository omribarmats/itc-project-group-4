import  Radio  from '@mui/material/Radio'
import React from 'react'

export default function UiRadio({...props}) {
  return (
    <Radio {...props} >
        {props.children}
    </Radio>
  )
}
