import styled from '@emotion/styled'
import React from 'react'
import UiDiv from '../layouts/UiDiv';

export  function UiShowFrom({ from = 'sm', display = 'block', ...props }) {

    const ResponsiveDiv = styled(UiDiv)(({ theme }) => ({
        display: "none",
        [theme.breakpoints.up(from)]: {
            display: display
        }
    }));

    return (
        <ResponsiveDiv {...props} >
            {props.children}
        </ResponsiveDiv>
    )
}

export  function UiHideFrom({from='sm', display='block', ...props}) {
  
    const ResponsiveDiv = styled(UiDiv) (({theme})=>({
       display: display,
       [theme.breakpoints.up(from)]: {
           display: "none"
       }
    }));   

   return (
       <ResponsiveDiv {...props} >
           {props.children}
       </ResponsiveDiv>
     )
   }
   
