import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Context from '../../../state/context';
import OverlayContainer from './OverlayContainer';

function generateContextComponent(props = {}, state = { donations: [] }, dispatch = jest.fn()) {

    return  <Context.Provider value={{ state, dispatch }}>
                <OverlayContainer {...props} />
            </Context.Provider>;
}

describe('<OverlayContainer />', () => {

    const props = {
        id: 1,
        currency: 'THB',
        handleClose: jest.fn(),
        render: jest.fn()
    };

    it('should render', () => {
        const { getByTestId } = render(generateContextComponent({ ...props }));
        expect(getByTestId('overlay-wrap')).toBeInTheDocument();
        expect(getByTestId('overlay-close')).toBeInTheDocument();
    });

    it('should close the overlay', () => {
        const { getByTestId } = render(generateContextComponent({ ...props }));
        const closeBtn = getByTestId('overlay-close');
        fireEvent.click(closeBtn);
        expect(closeBtn).toBeInTheDocument();
        expect(props.handleClose).toHaveBeenCalled();
    });

    it('should render children', () => {
        props.render.mockReturnValue(<React.Fragment>Render prop</React.Fragment>);
        const { container, getByText } = render(generateContextComponent({ ...props }));
        expect(props.render).toHaveBeenCalled();
        expect(getByText('Render prop')).toBeInTheDocument();
    });

});