import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Flex, Box, Text, Button } from 'rebass';
import Context from '../../../state/context';
import DonationControl from '../DonationControl/DonationControl';
import OverlayContainer from '../../containers/OverlayContainer/OverlayContainer';

const assetPath = process.env.PUBLIC_URL + '/assets/img/';

const CharityCard = ({ id, name, image, currency }) => {

    const [toggle, setToggle] = useState(false);
    const {state, dispatch} = useContext(Context);
    const [total, setTotal] = useState(0);
    const handleClick = () => setToggle(!toggle);
    
    useEffect(() => {
        if (state.donations.length > 0) {
            setTotal(state.donations.find(el => el.charitiesId === id).amount);
        }
    }, [state.donations, id]);

    return (
        <Flex
            data-testid="charity-card"  
            flexDirection="column"
            border="1px solid"
            borderColor="red">
            {toggle && 
                <OverlayContainer 
                    handleClose={ handleClick }
                    render={(handleClose) => {
                        return <DonationControl 
                                    id={ id }
                                    currency={ currency }
                                    handleClose={ handleClose } />;
                    }} />
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
            <Box
                px={ 2 }
                pb={ 2 }
                mt={ -3 }>
                <Text
                    data-testid="donation-total"
                    color="#627381"
                    fontSize={ 1 }>
                    Amount donated: { total } ({ currency })
                </Text>
            </Box>
        </Flex>
    );
};

CharityCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired
};

export default CharityCard;