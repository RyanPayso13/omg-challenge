import * as ACTION_TYPES from './actionTypes';

export function setDonationTotals(donations = []) {
    return {
        type: ACTION_TYPES.SET_DONATION_TOTALS,
        payload: donations
    }
}

export function updateDonationTotalById({ id = null, amount = 0 }) {
    return {
        type: ACTION_TYPES.UPDATE_DONATION_TOTAL_BY_ID,
        payload: { id, amount }
    }
}