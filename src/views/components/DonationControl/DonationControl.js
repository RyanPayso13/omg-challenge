import React, { useEffect, useState, useContext, useRef } from 'react';
import { Heading, Button } from 'rebass';
import * as CONSTANTS from '../../../constants';
import * as actions from '../../../state/actions/actionCreators';
import Context from '../../../state/context';
import { ValidationMessage } from '../Styled/ValidationMessage';  

const DonationControl = ({ id, currency }) => {

    const amounts = [...CONSTANTS.DONATION_AMOUNTS];
    const {state, dispatch} = useContext(Context);
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState('');
    const [validation, setValidation] = useState(false);
    const amountRef = useRef();
    const handleOnChange = (event) => {
        setAmount(amountRef.current.value);
    };
    const handleOnSubmit = async (event) => {
        event.preventDefault();

        if (amount === '') {
            return setValidation(true);
        } else {
            setValidation(false);
        };

        try {
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
        }
    };

    useEffect(() => {
        if (state.donations.length > 0) {
            setTotal(state.donations.find(el => el.charitiesId === id).amount);
        }
    }, [state.donations, id]);

    return(
        <React.Fragment>
            <Heading 
                data-testid="donation-total">Amount donated: { total } { currency }</Heading>
            <form 
                onSubmit={ handleOnSubmit }  
                data-testid="donation-form">
                <label 
                    htmlFor="donation-amount"
                    data-testid="donation-label">Select the amount to donate ({ currency })</label>
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
                {validation && <ValidationMessage data-testid="donation-validation-message">Please select an amount!</ValidationMessage>}
                <Button 
                    data-testid="donation-cta"
                    border="1px solid"
                    borderColor="#2b6cb0"
                    color="#2b6cb0"
                    bg="white">
                    Pay
                </Button>
            </form>
        </React.Fragment>
    );
};

export default DonationControl;