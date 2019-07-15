import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import * as CONSTANTS from '../../../constants';
import DonationControl from './DonationControl';

describe('<DonationControl />', () => {

    const props = {
        id: 1, 
        currency: 'THB' 
    };

    it('should exist', () => {
        const { getByTestId } = render(<DonationControl {...props} />);
        expect(getByTestId('donation-form')).toBeInTheDocument();
    });

    it('should render a label', () => {
        const { getByTestId } = render(<DonationControl {...props} />);
        const label = getByTestId('donation-label');
        expect(label).toBeInTheDocument();
        expect(label).toHaveTextContent(`Select the amount to donate (${ props.currency })`);
    });

    it('should render a donate CTA', () => {
        const { getByTestId } = render(<DonationControl {...props} />);
        const cta = getByTestId('donation-cta');
        expect(cta).toBeInTheDocument();
        expect(cta).toHaveTextContent('Pay');
    });

    it('should be disabled on form submission', () => {

    });

    describe('Amount selection', () => {

        it('should render a donation select amount', () => {
            const { getByTestId } = render(<DonationControl {...props} />);
            const select = getByTestId('donation-amount');
            expect(select).toBeInTheDocument();
        });

        it('should have amount options', () => {
            const { container, getByTestId } = render(<DonationControl {...props} />);
            const select = getByTestId('donation-amount');
            const options = container.querySelectorAll('option');
            expect(options.length).toEqual(6);
        });

    });

});