import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { TweetReducer } from '../tweet/reducer';
import { UsersReducer } from '../user/reducer';

export const store = createStore(
    combineReducers({
        users: UsersReducer,
        tweet: TweetReducer,
    }),
    applyMiddleware(thunk)
)