import  Button  from '@mui/material/Button'
import UiButton from '../../ui/uiKit/componentsUi/UiButton'
import React from 'react'


export default function NavBarButton({...props}) {
  return (
    <UiButton sx={{color:'white', px:3, alignSelf: 'stretch'}} {...props} >
        {props.children}
    </UiButton>
  )
}
