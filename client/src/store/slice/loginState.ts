import { createSlice } from '@reduxjs/toolkit';

interface IinitialState {
	loginState: boolean;
}

const initialState : IinitialState = {
	loginState: false
}

const loginStateSlice = createSlice({
	name:"loginStateSlice",
	initialState,
	reducers: {
		setLogin: (state) => {
			state.loginState = true
		},
		setLogout: (state) => {
			state.loginState = false
		}
	}
})

export const { setLogin, setLogout } = loginStateSlice.actions;

export default loginStateSlice;