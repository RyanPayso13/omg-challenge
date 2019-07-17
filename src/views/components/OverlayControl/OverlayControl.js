import React from 'react';
import DonationControl from '../DonationControl/DonationControl';
import { OverlayClose } from '../Styled/OverlayClose';
import { OverlayWrap } from '../Styled/OverlayWrap';

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
                handleToggle={ handleToggle }
                data-testid="overlay-donation-control" />
        </OverlayWrap>
    );
};

export default OverlayControl;