import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    text: '',
};

const getSearchTextSlice = createSlice({
    name: 'getSearchTextSlice',
    initialState,
    reducers: {
        getText: (state, action) => {
            state.text = action?.payload;
        },
    },
});

export const { getText } = getSearchTextSlice.actions;
export default getSearchTextSlice.reducer;
