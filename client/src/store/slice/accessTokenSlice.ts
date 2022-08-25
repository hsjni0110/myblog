import { createSlice } from '@reduxjs/toolkit';

interface IinitialState {
	token: string;
}

const initialState : IinitialState = {
	token: ""
}

const accessTokenSlice = createSlice({
	name:"accessTokenSlice",
	initialState,
	reducers: {
		login: (state, action) => {
			state.token = action.payload;
		},
		logout: (state) => {
			state.token = initialState.token;
		}
	}
})

export const { login, logout } = accessTokenSlice.actions;

export default accessTokenSlice;