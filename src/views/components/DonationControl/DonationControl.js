import React from 'react';
import { Button } from 'rebass';
import * as CONSTANTS from '../../../constants';

const DonationControl = ({ id, currency }) => {

    const amounts = [...CONSTANTS.DONATION_AMOUNTS];

    return(
        <form 
            data-testid="donation-form">
            <label 
                htmlFor="donation-amount"
                data-testid="donation-label">Select the amount to donate ({ currency })</label>
            <select 
                name="donation-amount"
                data-testid="donation-amount">
                    <option 
                        value="">
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
            <Button 
                data-testid="donation-cta"
                border="1px solid"
                borderColor="#2b6cb0"
                color="#2b6cb0"
                bg="white">
                Pay
            </Button>
        </form>
    );
};

export default DonationControl;