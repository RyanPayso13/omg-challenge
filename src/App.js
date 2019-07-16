import React, { useReducer } from 'react';
import Context from './state/context';
import { Flex, Box, Heading } from 'rebass'; 
import { donationReducer, initialState } from './state/reducers/donationReducer';
import CharitiesGrid from './views/containers/CharitiesGrid/CharitiesGrid';
import './App.css';

function App() {

  const [state, dispatch] = useReducer(donationReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Flex>
          <Box
            width={[ 1, 3/4 ]}
            mx={'auto'}
            py="4">
            <Heading
              color="#627381" 
              fontSize={[ 4, 6 ]} 
              textAlign="center">Omise Tamboon React</Heading>
            <CharitiesGrid />
          </Box>
      </Flex>
    </Context.Provider>
  );
}

export default App;
