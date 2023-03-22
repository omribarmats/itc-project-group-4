import  Typography from '@mui/material/Typography'
import React from 'react'

export default function UiText({verticalCentered, sx={}, ...props}) {
  let newSx = sx
  
  if(verticalCentered) {
  const sxVerticalCenter={display:'flex', alignItems:'center', height:'100%'}
  newSx = {...sx, ...sxVerticalCenter}
  }
  
  return (

    <Typography {...props} sx={newSx}>
        {props.children}
    </Typography>
  )
}
