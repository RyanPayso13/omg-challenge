import React from 'react';
import { render, fireEvent, waitForElement, wait } from '@testing-library/react';
import { FetchMock, fetchMock } from '@react-mock/fetch';
import * as CONSTANTS from '../../../constants';
import Context from '../../../state/context';
import DonationControl from './DonationControl';

function generateContextComponent(props = {}, state = { donations: [] }, dispatch = jest.fn(), resp = []) {

    return <FetchMock mocks={[{
                matcher: `${CONSTANTS.API_URL}/payments`, 
                response: resp
            }]}>
                <Context.Provider value={{ state, dispatch }}>
                    <DonationControl {...props} />
                </Context.Provider>
            </FetchMock>;
}

describe('<DonationControl />', () => {

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

        it('should submit the donation', async () => {
            const { getByTestId } = render(generateContextComponent(props));
            const select = getByTestId('donation-amount');
            const btn = getByTestId('donation-cta');

            expect(select.value).toBe('');
            fireEvent.change(select, { target: { value: '10' } });
            expect(select.value).toBe('10');
            fireEvent.click(btn);
            expect(fetchMock.called(`${CONSTANTS.API_URL}/payments`)).toBe(true);
            expect(fetchMock.lastUrl()).toEqual('http://localhost:3001/payments');
            expect(fetchMock.lastOptions()).toEqual({"body": "{\"charitiesId\":1,\"amount\":10,\"currency\":\"THB\"}", "headers": {"Content-Type": "application/json"}, "method": "POST"});
        
            const successView = await waitForElement(() => getByTestId('notification-container'));
            const successMsg = await waitForElement(() => getByTestId('notification-message'));
            expect(successView).toBeInTheDocument();
            expect(successMsg).toHaveTextContent('Your donation was successful!');
            expect(successMsg).toHaveStyle('color: #B62420');
        });

        it('should render error state', async () => {
            const { getByTestId } = render(generateContextComponent(props, { donations: [] }, jest.fn(), Promise.reject('API error')));
            const select = getByTestId('donation-amount');
            const btn = getByTestId('donation-cta');
            fireEvent.change(select, { target: { value: '10' } });
            fireEvent.click(btn);
        
            const errorView = await waitForElement(() => getByTestId('notification-container'));
            const errorMsg = await waitForElement(() => getByTestId('notification-message'));
            expect(errorView).toBeInTheDocument();
            expect(errorMsg).toHaveTextContent('There has been an error!');
            expect(errorMsg).toHaveStyle('color: red');
        });

    });

});