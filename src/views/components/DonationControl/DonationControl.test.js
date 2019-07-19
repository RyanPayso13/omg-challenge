import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Context from '../../../state/context';
import DonationControl from './DonationControl';

function generateContextComponent(props = {}, state = { donations: [] }, dispatch = jest.fn()) {

    return <Context.Provider value={{ state, dispatch }}>
                <DonationControl {...props} />
            </Context.Provider>;
}

fdescribe('<DonationControl />', () => {

    const props = {
        id: 1, 
        currency: 'THB' 
    };

    it('should render', () => {
        const { getByTestId } = render(generateContextComponent(props));
        expect(getByTestId('donation-form')).toBeInTheDocument();
    });

    it('should render a label', () => {
        const { getByTestId } = render(generateContextComponent(props));
        const label = getByTestId('donation-label');
        expect(label).toBeInTheDocument();
        expect(label).toHaveTextContent(`Select the amount to donate (${ props.currency })`);
    });

    it('should render a donate CTA', () => {
        const { getByTestId } = render(generateContextComponent(props));
        const cta = getByTestId('donation-cta');
        expect(cta).toBeInTheDocument();
        expect(cta).toHaveTextContent('Pay');
    });

    describe('Amount selection', () => {

        it('should render a donation select amount', () => {
            const { getByTestId } = render(generateContextComponent(props));
            const select = getByTestId('donation-amount');
            expect(select).toBeInTheDocument();
        });

        it('should have amount options', () => {
            const { container } = render(generateContextComponent(props));
            const options = container.querySelectorAll('option');
            expect(options.length).toEqual(6);
        });

        it('should render a validation message', async () => {
            const { getByTestId } = render(generateContextComponent(props));

            fireEvent.click(getByTestId('donation-cta'));

            const msg = getByTestId('donation-validation-message');

            expect(msg).toBeInTheDocument();
            expect(msg).toHaveTextContent('Please select an amount!');
        });

    });

    describe('Donation submission', () => {

        it('should submit the donation', () => {

        });

        it('should not submit the donation', () => {

        });

        it('should render the success state', () => {

        });

        it('should render the error state', () => {

        });

    });

});