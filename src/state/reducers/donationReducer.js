import _  from 'lodash';
import * as ACTION_TYPES from '../actions/actionTypes';

export const initialState = {
    donations: []
};

export const donationReducer = (state = initialState, action = '') => {
    switch(action.type) {
      case ACTION_TYPES.SET_DONATION_TOTALS:

        const output = _([...action.payload])
							.groupBy('charitiesId')
							.map((objs, key) => ({
								'charitiesId': parseInt(key, 10),
								'amount': _.sumBy(objs, 'amount')
							}))
              .value();
              
        return {
          ...state,
          donations: output
        };
      case ACTION_TYPES.UPDATE_DONATION_TOTAL_BY_ID:
          const updated = state.donations.map((item, index) => {
            if (item.charitiesId === action.payload.charitiesId) {
              return {
                ...item,  
                amount: item.amount + action.payload.amount
              }
            }
            return item;
          });
          return {
            ...state,
            donations: updated
          };
      default:
        return {...state};
    }
}