import React from 'react';
import { Flex, Box, Heading } from 'rebass'; 
import CharitiesGrid from './views/containers/CharitiesGrid/CharitiesGrid';
import './App.css';

function App() {
  return (
    <Flex>
        <Box
          width={[ 1, 3/4 ]}
          mx={'auto'}
          py="4">
          <Heading 
            fontSize={[ 4, 6 ]} 
            textAlign="center">Omise Tamboon React</Heading>
          <CharitiesGrid />
        </Box>
    </Flex>
  );
}

export default App;
