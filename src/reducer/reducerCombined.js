import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer';
import getSearchTextSliceReducer from './getSearchText';

const reducer = combineReducers({
    userInfo: userReducer,
    getSearchTextSlice: getSearchTextSliceReducer,
});

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
