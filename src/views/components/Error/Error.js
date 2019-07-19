import React from 'react';
import { Flex, Text, Button } from 'rebass';
import { OverlayWrap } from '../Styled';

const Error = ({ callback }) => {
    return (
        <OverlayWrap
            data-testid="error-container">
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%">
                <Text 
                    data-testid="error-message"
                    color="#627381"
                    mb={ 2 }>
                    There has been an error!
                </Text>
                {!!callback && 
                    <Button 
                        data-testid="close-cta"
                        border="1px solid"
                        borderColor="#2b6cb0"
                        color="#2b6cb0"
                        bg="white"
                        onClick={ callback }>
                        Close
                    </Button>
                }
            </Flex>
        </OverlayWrap>
    );
};

export default Error;