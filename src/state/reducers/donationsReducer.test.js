import { donationReducer } from './donationReducer';
import * as ACTION_TYPES from '../actions/actionTypes';

describe('Donation reducer', () => {

    it('should return the initial state', () => {
        expect(donationReducer()).toEqual({
            donations: []
        });
    });

    describe(`${ACTION_TYPES.SET_DONATION_TOTALS}`, () => {

        it('should group the charities by id and sum the donation amounts', () => {

            const payload = [
                {
                  "charitiesId": 2,
                  "amount": 10,
                  "currency": "THB",
                  "id": 1
                },
                {
                  "charitiesId": 1,
                  "amount": 20,
                  "currency": "THB",
                  "id": 2
                },
                {
                  "charitiesId": 3,
                  "amount": 50,
                  "currency": "THB",
                  "id": 3
                },
                {
                  "charitiesId": 4,
                  "amount": 100,
                  "currency": "THB",
                  "id": 4
                },
                {
                  "charitiesId": 2,
                  "amount": 500,
                  "currency": "THB",
                  "id": 5
                },
                {
                  "charitiesId": 5,
                  "amount": 500,
                  "currency": "THB",
                  "id": 6
                }
              ];

              expect(donationReducer({
                donations: []
            }, {
                type: ACTION_TYPES.SET_DONATION_TOTALS,
                payload: payload
            })).toEqual({"donations": [{"amount": 20, "charitiesId": 1}, {"amount": 510, "charitiesId": 2}, {"amount": 50, "charitiesId": 3}, {"amount": 100, "charitiesId": 4}, {"amount": 500, "charitiesId": 5}]});

        });

    });

    describe(`${ACTION_TYPES.UPDATE_DONATION_TOTAL_BY_ID}`, () => {

        const donations = [{
            charitiesId: 2,
            amount: 10,
            currency: "THB",
        },
        {
            charitiesId: 3,
            amount: 10,
            currency: "THB",
        }];
        const payload = {
            id: 2,
            amount: 100
        };

        it('should get the charity donation total by id', () => {
            expect(donationReducer({
                donations: [...donations]
            }, {
                type: ACTION_TYPES.UPDATE_DONATION_TOTAL_BY_ID,
                payload: payload
            })).toEqual({"donations": [{"amount": 10, "charitiesId": 2, "currency": "THB"}, {"amount": 10, "charitiesId": 3, "currency": "THB"}]});
        });

    });

});