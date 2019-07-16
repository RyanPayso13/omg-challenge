import React, {useState} from 'react';
import { Card, Flex, Text, Button } from 'rebass';
import OverlayControl from '../OverlayControl/OverlayControl';

const assetPath = process.env.PUBLIC_URL + '/assets/img/';

const CharityCard = ({ id, name, image, currency }) => {

    const [toggle, setToggle] = useState(false);
    const handleClick = () => setToggle(!toggle);
    return (
        <Flex
            data-testid="charity-card"  
            flexDirection="column"
            border="1px solid"
            borderColor="red">
            {toggle && <OverlayControl 
                id={ id } 
                currency={ currency }
                handleToggle={ handleClick } />
            }
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
                py={3}
                px={2}>
                <Text
                    data-testid="charity-card-name"
                    flex="auto"
                    alignSelf="center"
                    color="#627381">
                    { name }
                </Text>
                <Button 
                    data-testid="charity-card-cta"
                    border="1px solid"
                    borderColor="#2b6cb0"
                    color="#2b6cb0"
                    bg="white"
                    onClick={ handleClick }>
                        Donate
                </Button>
            </Flex>
        </Flex>
    );
};

export default CharityCard;