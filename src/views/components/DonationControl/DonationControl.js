import React, { useEffect, useState, useContext, useRef } from 'react';
import { Box, Flex, Heading, Button, Text } from 'rebass';
import { SyncLoader } from 'react-spinners';
import { css } from '@emotion/core';
import * as CONSTANTS from '../../../constants';
import * as actions from '../../../state/actions/actionCreators';
import Context from '../../../state/context';
import { ValidationMessage } from '../Styled/ValidationMessage';  
import { OverlayWrap } from '../../components/Styled/OverlayWrap';

const DonationControl = ({ id, currency, handleToggle }) => {

    const amounts = [...CONSTANTS.DONATION_AMOUNTS];
    const {state, dispatch} = useContext(Context);
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validation, setValidation] = useState(false);
    const amountRef = useRef();
    const handleOnChange = event => setAmount(amountRef.current.value);
    const handleOnSubmit = async (event) => {
        event.preventDefault();

        if (amount === '') {
            return setValidation(true);
        } else {
            setValidation(false);
        };

        try {
            setIsLoading(true);
            const result = await fetch(`${CONSTANTS.API_URL}/payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    charitiesId: id,
                    amount: parseInt(amount, 10),
                    currency: currency
                  })
            });
            result.json().then(data => dispatch(actions.updateDonationTotalById(data)));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    const loader = css`
        align-self: center;
        margin: 0 auto; 
    `;

    useEffect(() => {
        if (state.donations.length > 0) {
            setTotal(state.donations.find(el => el.charitiesId === id).amount);
        }
    }, [state.donations, id]);

    return(
        <React.Fragment>
            {isLoading && 
                <OverlayWrap
                    data-testid="loader">
                    <SyncLoader
                        css={ loader }
                        color='#3C98EE' />
                </OverlayWrap>
            }
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%">
                <form 
                    onSubmit={ handleOnSubmit }  
                    data-testid="donation-form">
                    <Flex
                        flexDirection="column"
                        alignItems="center">
                        <Box 
                            mb="2"
                            flex="flex">
                            <label 
                                htmlFor="donation-amount"
                                data-testid="donation-label">
                                    <Text color="#627381">Select the amount to donate ({ currency })</Text>
                            </label>
                        </Box>
                        <Box
                            mb="2">
                            <select
                                id="donation-amount" 
                                name="donation-amount"
                                data-testid="donation-amount"
                                onChange={ handleOnChange }
                                ref={ amountRef }
                                defaultValue="">
                                    <option value="">
                                        Select an amount...
                                    </option>
                                {amounts.length > 0 && amounts.map((amount, index) => {
                                    return <option 
                                                key={index}
                                                value={ amount }>
                                                { amount }
                                            </option>
                                })}
                            </select>
                        </Box>
                        {validation && 
                            <ValidationMessage data-testid="donation-validation-message">
                                Please select an amount!
                            </ValidationMessage>
                        }
                        <Box>
                            <Button 
                                data-testid="donation-cta"
                                border="1px solid"
                                borderColor="#2b6cb0"
                                color="#2b6cb0"
                                bg="white">
                                Pay
                            </Button>
                        </Box>
                    </Flex>
                </form>
            </Flex>
                {/* <Heading 
                    data-testid="donation-total"
                    color="#627381">
                        Amount donated: { total } { currency }
                </Heading> */}
                {/* <form 
                    onSubmit={ handleOnSubmit }  
                    data-testid="donation-form">
                        <Flex
                            flexDirection="column"
                            alignSelf="center">
                            <Flex
                                flexDirection="column"
                                alignItems="center">
                                <Box 
                                    mb="2"
                                    flex="flex">
                                    <label 
                                        htmlFor="donation-amount"
                                        data-testid="donation-label">
                                            <Text color="#627381">Select the amount to donate ({ currency })</Text>
                                    </label>
                                </Box>
                                <Box
                                    mb="2">
                                    <select 
                                        name="donation-amount"
                                        data-testid="donation-amount"
                                        onChange={ handleOnChange }
                                        ref={ amountRef }
                                        defaultValue="">
                                            <option value="">
                                                Select an amount...
                                            </option>
                                        {amounts.length > 0 && amounts.map((amount, index) => {
                                            return <option 
                                                        key={index}
                                                        value={ amount }>
                                                        { amount }
                                                    </option>
                                        })}
                                    </select>
                                </Box>
                                {validation && <ValidationMessage data-testid="donation-validation-message">Please select an amount!</ValidationMessage>}
                                <Box>
                                    <Button 
                                        data-testid="donation-cta"
                                        border="1px solid"
                                        borderColor="#2b6cb0"
                                        color="#2b6cb0"
                                        bg="white">
                                        Pay
                                    </Button>
                                </Box>
                            </Flex>
                        </Flex>
                </form> */}
        </React.Fragment>
    );
};

export default DonationControl;