import styled from '@emotion/styled'
import React from 'react'
import UiDiv from './UiDiv';


export  function UiFlexDiv({
    w100 = false,
    display = 'flex',
    direction = 'row',
    justifyContent = 'flex-start',
    alignItems = 'stretch',
    flexWrap = 'wrap',
    alignContent = 'stretch',
    gap = 0,
    sx,
    ...props
}) {
    const StyledFlexDiv = styled(UiDiv)(({ theme }) => ({
        display: 'flex',
        width: w100? '100%' : 'auto',
        flexDirection: direction,
        justifyContent: justifyContent,
        alignItems: alignItems,
        flexWrap: flexWrap,
        alignContent: alignContent,
        gap: theme.spacing(gap),
        ...sx,
    }));

    return (
        <StyledFlexDiv {...props} >
            {props.children}
        </StyledFlexDiv>
    )
}

export function UiFlexRow(props) {
    return (
        <UiFlexDiv direction='row' {...props} >
            {props.children}
        </UiFlexDiv>
    )
}

export function UiFlexCol(props) {
    return (
        <UiFlexDiv direction='column' {...props} >
            {props.children}
        </UiFlexDiv>
    )
}

export function UiFlexColToRowFrom({from='sm', gapX=0, gapY=0, gap=0, ...props}){

    const newGapX = gapX ? gapX : gap;
    const newGapY =  gapY?  gapY : gap;
    
    const ResponsiveFlex = styled(UiFlexDiv) (({theme})=>({
        flexDirection: 'column',
        gap: theme.spacing(newGapY),
        [theme.breakpoints.up(from)]: {
            flexDirection: "row",
            gap: theme.spacing(newGapX),
        }
     }));  
      
    return (
        <ResponsiveFlex {...props} >
            {props.children}
        </ResponsiveFlex>
    )
}



