import React from 'react';
import { Flex, Text, Button } from 'rebass';
import { OverlayWrap } from '../Styled';

const NotificationMessage = ({ message = '', callback, msgColor = "#627381" }) => {
    return (
        <OverlayWrap
            data-testid="notification-container">
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%">
                <Text 
                    data-testid="notification-message"
                    color={ msgColor }
                    mb={ 2 }>
                    { message }
                </Text>
                {!!callback && 
                    <Button 
                        data-testid="notification-cta"
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

export default NotificationMessage;