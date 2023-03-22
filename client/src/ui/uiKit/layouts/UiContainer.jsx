import { Container } from '@mui/material'
import React from 'react'

export default function UiContainer(props) {
  return (
    <Container {...props}>
        {props.children}
    </Container>
  )
}
