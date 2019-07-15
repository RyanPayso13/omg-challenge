import React, { useEffect, useState, useReducer } from 'react';
import styled from 'styled-components';
import * as CONSTANTS from '../../../constants';
import * as actions from '../../../state/actions/actionCreators';
import { initialState, donationReducer } from '../../../state/reducers/donationReducer';
import CharityCard from '../../components/CharityCard/CharityCard'; 

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin-top: 3rem;
`;

const CharitiesGrid = () => {

    const [donations, dispatch] = useReducer(donationReducer, initialState);
    const [charities, setCharities] = useState([]);
    const fetchData = async () => {
        try {
            const results = await Promise.all([
                fetch(`${CONSTANTS.API_URL}/charities`), 
                fetch(`${CONSTANTS.API_URL}/payments`)
            ]);
            results[0]
                .json()
                .then(data => {
                    setCharities(data);
                });
            results[1]
                .json()
                .then(data => {
                    dispatch(actions.setDonationTotals(data)); 
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <GridContainer
            data-testid="charities-grid">
                {charities.length > 0 && charities.map((el, index) => (
                    <CharityCard
                        key={index} 
                        {...el} 
                    />
                ))}
        </GridContainer>
    );
};

export default CharitiesGrid;