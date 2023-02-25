import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import usersReducer from './users-reducer'
import profileReducer from './profile-reducer'
import authReducer from './auth-reducer'
import appReducer from './app-reducer'
import dialogsReducer from './dialogs-reducer'
import { reducer as formReducer } from 'redux-form'
import chatReducer from './chat-reducer';
import pricesReducer from './prices-reducer';

let reducers = combineReducers({
    usersPage: usersReducer,
    profilePage: profileReducer,
    authReducer: authReducer,
    form: formReducer,
    appReducer: appReducer,
    chatReducer: chatReducer,
    dialogsPage: dialogsReducer,
    pricesPage: pricesReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store