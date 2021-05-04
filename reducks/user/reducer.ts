import * as Actions from './action';
import { initialState } from '../store/initialState';

export const UsersReducer = (state = initialState.users, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            };
        case Actions.SIGN_OUT:
            return {
                ...initialState.users,
            };
            case Actions.UPDATE_USER:
                return {
                    ...state,
                    ...action.payload
                };
        default:
            return state
    }
};