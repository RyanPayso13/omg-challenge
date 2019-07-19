import React from 'react';
import DonationControl from '../DonationControl/DonationControl';
import { OverlayClose, OverlayWrap } from '../Styled';

const OverlayControl = ({ id, currency, handleToggle }) => {

    return (
        <OverlayWrap 
            data-testid="overlay-wrap">
            <OverlayClose 
                size="24"
                data-testid="overlay-close"
                onClick={ handleToggle } />
            <DonationControl 
                id={ id } 
                currency={ currency }
                handleToggle={ handleToggle } />
        </OverlayWrap>
    );
};

export default OverlayControl;