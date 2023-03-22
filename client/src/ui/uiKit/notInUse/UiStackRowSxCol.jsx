import React from 'react'
import UiStack from './UiStack'

export default function UiStackRowSxCol({sx={}, ...props}) {
  return (
    <UiStack sx={{flexDirection: {xs: 'column', sm: 'row' }, ...sx}} {...props} >
        {props.children}
    
    </UiStack>
  )
}
