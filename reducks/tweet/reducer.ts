import * as Actions from './action';
import { initialState } from '../store/initialState';

export const TweetReducer = (state = initialState.tweet, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case Actions.NEW_POST:
            return {
                ...state,
                ...action.payload
            };
        case Actions.FETCH_TWEETS:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state
    }
};