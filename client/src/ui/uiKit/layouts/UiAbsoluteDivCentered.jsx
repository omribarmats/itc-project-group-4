import React from 'react';
import styled from '@emotion/styled';
import UiDiv from './UiDiv';

export default function UiAbsoluteDivCentered({ top, left, sx = {}, ...props }) {

    const AbsCenteredDiv = styled(UiDiv)(({ theme }) => ({
        position: 'absolute',
        top: top || '50%',
        left: left || '50%',
        zIndex: '1000',
        transform: 'translateY(-50%) translateX(-50%)',
        ...sx
    }));
    return (
        <AbsCenteredDiv {...props}  >
            {props.children}
        </AbsCenteredDiv>
    )
}
