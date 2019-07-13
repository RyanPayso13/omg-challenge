import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { FetchMock, fetchMock } from '@react-mock/fetch';
import * as CONSTANTS from '../../../constants';
import CharitiesGrid from './CharitiesGrid';

function createFetchMock() {
    return <FetchMock mocks={[
            {
                matcher: `${CONSTANTS.API_URL}/charities`, 
                response: []
            },
            {
                matcher: `${CONSTANTS.API_URL}/payments`, 
                response: []
            },        
        ]}
        >
            <CharitiesGrid />
        </FetchMock>;
}

describe('<CharitiesGrid />', () => {

    it('should exist', () => {
        const { getByTestId } = render(<CharitiesGrid />);
        expect(getByTestId('charities-grid')).toBeInTheDocument();
    });

    it('should fetch charities', async () => {
        const { container } = render(createFetchMock());
        expect(fetchMock.called(`${CONSTANTS.API_URL}/charities`)).toBe(true);
    });  

    it('should fetch payments', async () => {
        const { container } = render(createFetchMock());
        expect(fetchMock.called(`${CONSTANTS.API_URL}/payments`)).toBe(true);
    });    

});