import { createTheme } from '@mui/material/styles';

import { deepPurple } from '@mui/material/colors';

export const customTheme = createTheme({
	palette: {
		primary: {
			main: deepPurple[500],
		},
	},
});