import React, { useState } from 'react';
import { Card, Flex, Text, Button } from 'rebass';

const assetPath = process.env.PUBLIC_URL + '/assets/img/';

const CharityCard = ({ id, name, image, currency }) => {

    return (
        <Flex
            data-testid="charity-card"  
            flexDirection="column"
            border="1px solid"
            borderColor="red">
            <Card
                data-testid="charity-card-image"
                width={1}
                mx="auto"
                py={100}
                backgroundImage={`url(${assetPath}${image})`}
                backgroundSize="cover">
            </Card>
            <Flex
                flexDirection="row"
                pt={2}>
                <Text
                    data-testid="charity-card-name"
                    flex="auto"
                    alignSelf="center">{ name }</Text>
                <Button 
                    data-testid="charity-card-cta"
                    border="1px solid"
                    borderColor="#2b6cb0"
                    color="#2b6cb0"
                    bg="white">Donate</Button>
            </Flex>
        </Flex>
    );
};

export default CharityCard;