import * as ACTION_TYPES from './actionTypes';
import * as actions from './actionCreators';

describe('Action Creators', () => {

    it('should set the total donations', () => {
        const payload = [];
        const expectedAction = {
            type: ACTION_TYPES.SET_DONATION_TOTALS,
            payload
        };
        expect(actions.setDonationTotals(payload)).toEqual(expectedAction);
    });

    it('should update the donation total by charity id', () => {
        const payload = {
            charitiesId: 1,
            amount: 100
        };
        const expectedAction = {
            type: ACTION_TYPES.UPDATE_DONATION_TOTAL_BY_ID,
            payload
        };
        expect(actions.updateDonationTotalById(payload)).toEqual(expectedAction);
    });

});