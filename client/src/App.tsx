import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Client from './layouts/Client';
import { Reset } from 'styled-reset';
import { store } from './store/config';
import { Provider } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { customTheme } from '@utils/theme';
import './App.css';

function App() {
	return (
		<MuiThemeProvider theme={customTheme}>
			<ThemeProvider theme={customTheme}>
				<Provider store={store}>
					<BrowserRouter>
						<Reset />
						<Client />
					</BrowserRouter>
				</Provider>
			</ThemeProvider>
		</MuiThemeProvider>
	);
}

export default App;