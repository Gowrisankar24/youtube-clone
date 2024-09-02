import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer';

const reducer = combineReducers({
    userInfo: userReducer,
});

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
