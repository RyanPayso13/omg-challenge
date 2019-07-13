import React from 'react';
import { Card, Flex, Text, Button } from 'rebass';

const aseetPath = process.env.PUBLIC_URL + '/assets/img/';

const CharityCard = ({ id, name, image, currency }) => {
    return (
        <Flex
            data-testid="charity-card"  
            flexDirection="column">
            <Card
                width={1}
                mx="auto"
                py={100}
                backgroundImage={`url(${aseetPath}${image})`}
                backgroundSize='cover'>
            </Card>
            <Flex
                flexDirection="row"
                pt={2}>
                <Text
                    flex="auto"
                    alignSelf="center">{ name }</Text>
                <Button 
                    border="1px solid"
                    borderColor="#2b6cb0"
                    color="#2b6cb0"
                    bg="white">Donate</Button>
            </Flex>
        </Flex>
    );
};

export default CharityCard;