import React, { useEffect, useState, useContext } from 'react';
import * as CONSTANTS from '../../../constants';
import * as actions from '../../../state/actions/actionCreators';
import Context from '../../../state/context';
import CharityCard from '../../components/CharityCard/CharityCard'; 
import { GridContainer } from '../../components/Styled/GridContainer';

const CharitiesGrid = () => {

    const { state, dispatch } = useContext(Context);
    const [charities, setCharities] = useState([]);
    const fetchData = async () => {
        try {
            const results = await Promise.all([
                fetch(`${CONSTANTS.API_URL}/charities`), 
                fetch(`${CONSTANTS.API_URL}/payments`)
            ]);
            results[0]
                .json()
                .then(data => setCharities(data));
            results[1]
                .json()
                .then(data => dispatch(actions.setDonationTotals(data)));
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
                        key={ index } 
                        { ...el }
                    />
                ))}
        </GridContainer>
    );
};

export default CharitiesGrid;