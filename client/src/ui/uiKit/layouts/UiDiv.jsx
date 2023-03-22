import React from 'react';
import styled from '@emotion/styled';

export default function UiDiv({sx={}, p, m,  ...props}) {

    const StyledDiv = styled('div')(({ theme }) => ({
        padding: p ? theme.spacing(p) : 0,
        margin: m ? theme.spacing(m) : 0,
        ...sx
    }));
  return (
    <StyledDiv {...props}  >
        {props.children}
    </StyledDiv>
  )
}
