import React from 'react';
import PropTypes from 'prop-types';
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

OverlayControl.propTypes = {
    id: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    handleToggle: PropTypes.func.isRequired
};

export default OverlayControl;