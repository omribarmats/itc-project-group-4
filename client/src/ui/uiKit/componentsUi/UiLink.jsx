import Link from '@mui/material/Link'
import React from 'react'

export default function UiLink({...props}) {
  return (
    <Link {...props} >
        {props.children}
    </Link>
  )
}
