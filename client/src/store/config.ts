import { configureStore } from '@reduxjs/toolkit';
import accessTokenSlice from '@store/slice/accessTokenSlice';
import loginStateSlice from '@store/slice/loginState';

export const store = configureStore({
	reducer: {
		token: accessTokenSlice.reducer,
		loginState: loginStateSlice.reducer
	}
})
export type RootState = ReturnType<typeof store.getState>