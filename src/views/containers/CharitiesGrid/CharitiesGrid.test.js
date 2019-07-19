import React from 'react';
import { render, waitForElement, wait } from '@testing-library/react';
import { FetchMock, fetchMock } from '@react-mock/fetch';
import * as CONSTANTS from '../../../constants';
import Context from '../../../state/context';
import * as ACTION_TYPES from '../../../state/actions/actionTypes';
import CharitiesGrid from './CharitiesGrid';

function generateComponent(charityResp = [], paymentsResp = [], state = { donations: [] }, dispatch = jest.fn()) {
    return <FetchMock mocks={[
                    {
                        matcher: `${CONSTANTS.API_URL}/charities`, 
                        response: charityResp
                    },
                    {
                        matcher: `${CONSTANTS.API_URL}/payments`, 
                        response: paymentsResp
                    },        
                ]}>
                <Context.Provider value={{ state, dispatch }}>
                    <CharitiesGrid />
                </Context.Provider>
            </FetchMock>;
}

describe('<CharitiesGrid />', () => {

    it('should exist', () => {
        const { getByTestId } = render(generateComponent());
        expect(getByTestId('charities-grid')).toBeInTheDocument();
    });

    it('should fetch charities', async () => {
        render(generateComponent());
        expect(fetchMock.called(`${CONSTANTS.API_URL}/charities`)).toBe(true);
    });  

    it('should fetch payments', async () => {
        render(generateComponent());
        expect(fetchMock.called(`${CONSTANTS.API_URL}/payments`)).toBe(true);
    });    

    it('should render a card', async () => {
        const { getAllByTestId } = render(generateComponent([{
            "id": 1,
            "name": "Baan Kru Noi",
            "image": "baan-kru-noi.jpg",
            "currency": "THB"
          }]));
        const cards = await waitForElement(() => getAllByTestId('charity-card'));
        expect(cards.length).toEqual(1);  
    });

    it('should render multiple cards', async () => {
        const { getAllByTestId } = render(generateComponent([{
            "id": 1,
            "name": "Baan Kru Noi",
            "image": "baan-kru-noi.jpg",
            "currency": "THB"
          },
          {
            "id": 2,
            "name": "Habitat for Humanity Thailand",
            "image": "habitat-for-humanity-thailand.jpg",
            "currency": "THB"
          }]));
        const cards = await waitForElement(() => getAllByTestId('charity-card'));
        expect(cards.length).toEqual(2);  
    });

    it('should dispatch the donation totals', async () => {
        const dispatch = jest.fn();
        const paymentsResp = [
            {
              "charitiesId": 2,
              "amount": 10,
              "currency": "THB",
              "id": 1
            },
            {
              "charitiesId": 1,
              "amount": 20,
              "currency": "THB",
              "id": 2
            },
            {
              "charitiesId": 3,
              "amount": 50,
              "currency": "THB",
              "id": 3
            },
            {
              "charitiesId": 4,
              "amount": 100,
              "currency": "THB",
              "id": 4
            },
            {
              "charitiesId": 2,
              "amount": 500,
              "currency": "THB",
              "id": 5
            },
            {
              "charitiesId": 5,
              "amount": 500,
              "currency": "THB",
              "id": 6
            }
          ];
        const { container } = render(generateComponent([], paymentsResp, { donations: [] }, dispatch));
        await wait(() => {
            expect(dispatch).toHaveBeenCalled();
            expect(dispatch).toHaveBeenCalledWith({
              payload: [...paymentsResp],
              type: ACTION_TYPES.SET_DONATION_TOTALS
            });
          });
    });

    it('should render error state', async () => {
      const { getByTestId } = render(generateComponent(Promise.reject('API error')));
      const errorView = await waitForElement(() => getByTestId('charities-grid-error'));
      expect(errorView).toBeInTheDocument();
      expect(errorView).toHaveTextContent('There has been an error!');
  });

});