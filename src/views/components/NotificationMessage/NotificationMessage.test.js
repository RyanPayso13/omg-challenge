import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NotificationMessage from './NotificationMessage';

describe('<NotificationMessage />', () => {

    it('should render', () => {
        const { container } = render(<NotificationMessage />);
        expect(container.firstChild).toMatchSnapshot();    
    });

    it('should have a message', () => {
        const { getByTestId } = render(<NotificationMessage message="Message" />);
        expect(getByTestId('notification-message')).toHaveTextContent('Message'); 
    });

    it('should be the default message color', () => {
        const { getByTestId } = render(<NotificationMessage />);
        expect(getByTestId('notification-message')).toHaveStyle('color: #B62420'); 
    });

    it('should have a close button', () => {
        const { getByTestId } = render(<NotificationMessage callback={ jest.fn() } />);
        const cta = getByTestId('notification-cta');
        expect(cta).toBeInTheDocument(); 
        expect(cta).toHaveTextContent('Close'); 
    });  
    
    it('should execute the callback prop', () => {
        const dispatch = jest.fn();
        const { getByTestId } = render(<NotificationMessage callback={ dispatch } />);
        fireEvent.click(getByTestId('notification-cta'));
        expect(dispatch).toHaveBeenCalled(); 
    });  

});
