import React from 'react';
import { css } from '@emotion/core';
import { SyncLoader } from 'react-spinners';
import { OverlayWrap } from '../Styled';

const Loader = () => {
    
    const loader = css`
        align-self: center;
        margin: 0 auto; 
    `;

    return (
        <OverlayWrap>
            <SyncLoader
                css={ loader }
                color='#3C98EE' />
        </OverlayWrap>
    );
};

export default Loader;