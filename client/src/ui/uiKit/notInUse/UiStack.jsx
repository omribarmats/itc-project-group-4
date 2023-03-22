import  Stack from '@mui/system/Stack'
import React from 'react'

export default function UiStack(props) {
  return (
    <Stack {...props} >
        {props.children}
    </Stack>
  )
}
