import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { UsersReducer } from '../user/reducer';

export const store = createStore(
    combineReducers({
        users: UsersReducer,
    }),
    applyMiddleware(thunk)
)