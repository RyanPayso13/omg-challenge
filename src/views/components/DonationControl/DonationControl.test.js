import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StateMock from '@react-mock/state';
import * as CONSTANTS from '../../../constants';
import Context from '../../../state/context';
import DonationControl from './DonationControl';

function generateContextComponent(props = {}, state = { donations: [] }, dispatch = jest.fn()) {

    return <Context.Provider value={{ state, dispatch }}>
                <DonationControl {...props} />
            </Context.Provider>;
}

describe('<DonationControl />', () => {

    const props = {
        id: 1, 
        currency: 'THB' 
    };

    it('should exist', () => {
        const { getByTestId } = render(generateContextComponent(props));
        expect(getByTestId('donation-form')).toBeInTheDocument();
    });

    it('should render a label', () => {
        const { getByTestId } = render(generateContextComponent(props));
        const label = getByTestId('donation-label');
        expect(label).toBeInTheDocument();
        expect(label).toHaveTextContent(`Select the amount to donate (${ props.currency })`);
    });

    it('should render the total donated', () => {
        const state = {
            donations:[{
                charitiesId: 1,
                amount: 100
            }]
        };
        const { getByTestId } = render(generateContextComponent(props, state));
        const total = getByTestId('donation-total');
        expect(total).toBeInTheDocument();
        expect(total).toHaveTextContent(`Amount donated: ${ state.donations[0].amount } ${ props.currency }`);
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
            const { container, getByTestId } = render(generateContextComponent(props));
            const options = container.querySelectorAll('option');
            expect(options.length).toEqual(6);
        });

        // xit('should render a validation message', async () => {
        //     const { getByText } = render(
        //         <StateMock state={{ validation: true }}>
        //           <DonationControl { ...props } />
        //         </StateMock>
        //       );
        //     const msg = await waitForElement(() => getByText('Please select an amount!'));
        //     expect(msg).toBeInTheDocument();
        //     expect(msg).toHaveTextContent('Please select an amount!');
        // });

    });

    describe('On submit', () => {

        it('should submit the donation', () => {

        });

        it('should not submit the donation', () => {

        });

    });

});