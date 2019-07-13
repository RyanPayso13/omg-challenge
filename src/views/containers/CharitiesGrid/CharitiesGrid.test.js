import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { FetchMock, fetchMock } from '@react-mock/fetch';
import * as CONSTANTS from '../../../constants';
import CharitiesGrid from './CharitiesGrid';

function createFetchMock(charityResp = [], paymentsResp = []) {
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
                <CharitiesGrid />
            </FetchMock>;
}

describe('<CharitiesGrid />', () => {

    it('should exist', () => {
        const { getByTestId } = render(<CharitiesGrid />);
        expect(getByTestId('charities-grid')).toBeInTheDocument();
    });

    it('should fetch charities', async () => {
        render(createFetchMock());
        expect(fetchMock.called(`${CONSTANTS.API_URL}/charities`)).toBe(true);
    });  

    it('should fetch payments', async () => {
        render(createFetchMock());
        expect(fetchMock.called(`${CONSTANTS.API_URL}/payments`)).toBe(true);
    });    

    it('should render a card', async () => {
        const { getAllByTestId } = render(createFetchMock([{
            "id": 1,
            "name": "Baan Kru Noi",
            "image": "baan-kru-noi.jpg",
            "currency": "THB"
          }]));
        const cards = await waitForElement(() => getAllByTestId('charity-card'));
        expect(cards.length).toEqual(1);  
    });

    it('should render multiple cards', async () => {
        const { getAllByTestId } = render(createFetchMock([     {
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

});