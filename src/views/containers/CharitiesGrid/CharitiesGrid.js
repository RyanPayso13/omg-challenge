import React, { useEffect, useState, useContext } from 'react';
import { Flex, Text } from 'rebass';
import * as CONSTANTS from '../../../constants';
import * as actions from '../../../state/actions/actionCreators';
import Context from '../../../state/context';
import Loader from '../../components/Loader/Loader';
import CharityCard from '../../components/CharityCard/CharityCard'; 
import { GridContainer } from '../../components/Styled/GridContainer';
import { GridCell } from '../../components/Styled/GridCell';
import { OverlayWrap } from '../../components/Styled/OverlayWrap';

const CharitiesGrid = () => {

    const { state, dispatch } = useContext(Context);
    const [charities, setCharities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchData = async () => {
        try {
            setIsLoading(true);
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
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <GridContainer
            data-testid="charities-grid">
                <Loader 
                    isLoading={ isLoading } />
                {isError && 
                    <OverlayWrap
                        data-testid="charities-grid-error">
                        <Flex
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            width="100%">
                            <Text 
                                color="#627381"
                                mb={ 2 }>
                                There has been an error!
                            </Text>
                        </Flex>
                    </OverlayWrap>
                }
                {!isError && charities.length > 0 && charities.map((el, index) => (
                    <GridCell 
                        key={ index }>
                        <CharityCard
                            key={ index } 
                            { ...el }
                        />
                    </GridCell>
                ))}
        </GridContainer>
    );
};

export default CharitiesGrid;