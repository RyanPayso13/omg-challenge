import React from 'react';
import PropTypes from 'prop-types';
import { OverlayClose, OverlayWrap } from '../../components/Styled';

const OverlayContainer = (props) => {

    return (
        <OverlayWrap 
            data-testid="overlay-wrap">
            <OverlayClose 
                size="24"
                data-testid="overlay-close"
                onClick={ props.handleClose } />
                { props.render() }
        </OverlayWrap>
    );
};

OverlayContainer.propTypes = {
    handleClose: PropTypes.func.isRequired
};

export default OverlayContainer;