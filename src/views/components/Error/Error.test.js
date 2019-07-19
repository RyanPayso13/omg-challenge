import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Error from './Error';

describe('<Error />', () => {

    it('should render', () => {
        const { container } = render(<Error />);
        expect(container.firstChild).toMatchSnapshot();    
    });

    it('should have an error message', () => {
        const { getByTestId } = render(<Error />);
        expect(getByTestId('error-message')).toHaveTextContent('There has been an error!'); 
    });

    it('should have a close button', () => {
        const { getByTestId } = render(<Error callback={ jest.fn() } />);
        expect(getByTestId('error-message')).toBeInTheDocument(); 
    });  
    
    it('should execute the callback prop', () => {
        const dispatch = jest.fn();
        const { getByTestId } = render(<Error callback={ dispatch } />);
        fireEvent.click(getByTestId('close-cta'));
        expect(dispatch).toHaveBeenCalled(); 
    });  

});
