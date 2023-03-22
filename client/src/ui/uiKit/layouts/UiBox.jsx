import  Box  from '@mui/system/Box'
import React from 'react'

export default function UiBox(props) {
  return (
    <Box {...props}>
        {props.children}
    </Box>
  )
}
