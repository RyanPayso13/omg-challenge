import React from 'react';
import { Flex, Box, Heading } from 'rebass'; 

const CharitiesGrid = () => {
    return (
        <Flex flexWrap="wrap" 
            data-testid="charities-grid">
            <Box p={3} width={[ 1, 1/2 ]}>
                <Heading my={4} fontSize={[ 5, 6, 7 ]}>Consistent</Heading>
            </Box>
            <Box p={3} width={[ 1, 1/2 ]}>
                <Heading my={4} fontSize={[ 5, 6, 7 ]}>Flexible</Heading>
            </Box>
        </Flex>
    );
};

export default CharitiesGrid;