import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Context from '../../../state/context';
import OverlayControl from './OverlayControl';

function generateContextComponent(props = {}, state = { donations: [] }, dispatch = jest.fn()) {

    return  <Context.Provider value={{ state, dispatch }}>
                <OverlayControl {...props} />
            </Context.Provider>;
}

describe('<OverlayControl />', () => {

    const props = {
        id: 1,
        currency: 'THB',
        handleToggle: jest.fn()
    };

    it('should render', () => {
        const { getByTestId } = render(generateContextComponent({ ...props }));
        expect(getByTestId('overlay-wrap')).toBeInTheDocument();
    });

    it('should close the overlay', () => {
        const { getByTestId } = render(generateContextComponent({ ...props }));
        const closeBtn = getByTestId('overlay-close');
        fireEvent.click(closeBtn);
        expect(closeBtn).toBeInTheDocument();
        expect(props.handleToggle).toHaveBeenCalled();
    });

    it('should render children', () => {
        const { getByTestId } = render(generateContextComponent({ ...props }));
        expect(getByTestId('donation-form')).toBeInTheDocument();
    });

});