import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as CONSTANTS from '../../../constants';
import CharityCard from '../../components/CharityCard/CharityCard'; 

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin-top: 3rem;
`;

const CharitiesGrid = () => {

    const [charities, setCharities] = useState([]);
    const fetchCharities = async () => {
        try {
            const results = await Promise.all([
                fetch(`${CONSTANTS.API_URL}/charities`), 
                fetch(`${CONSTANTS.API_URL}/payments`)
            ]);
            results[0]
                .json()
                .then((data) => {
                    setCharities(data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCharities();
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