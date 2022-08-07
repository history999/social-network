import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import usersReducer from './users-reducer'
import profileReducer from './profile-reducer'
import authReducer from './auth-reducer'

let reducers = combineReducers({
    usersPage: usersReducer,
    profilePage: profileReducer,
    authReducer: authReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store