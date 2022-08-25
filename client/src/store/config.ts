import { configureStore } from '@reduxjs/toolkit';
import accessTokenSlice from '@store/slice/accessTokenSlice';

export const store = configureStore({
	reducer: {
		token: accessTokenSlice.reducer
	}
})
export type RootState = ReturnType<typeof store.getState>