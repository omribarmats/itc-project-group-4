import Slider from '@mui/material/Slider'
import React from 'react'

export default function UiSlider({...props}) {
  return (
    <Slider {...props} >
        {props.children}
    </Slider>
  )
}
