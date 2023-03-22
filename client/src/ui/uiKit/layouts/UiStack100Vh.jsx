import React from 'react';
import UiStack from '../notInUse/UiStack';

export default function UiStack100Vh({sx={}, ...props}) {
  return (
    <UiStack {...props} sx={{height: 'var(--vh, 100vh)', ...sx }}>
      {props.children} 
    </UiStack>
  )
}
