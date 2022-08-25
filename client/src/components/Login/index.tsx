import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { login, logout } from '@store/slice/accessTokenSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/config';
import { Link } from 'react-router-dom';

interface ILogin {
	loginSuccess: boolean;
	setLoginSuccess: (login: boolean) => void;
}

const Login = ({loginSuccess, setLoginSuccess} : ILogin) => {
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');


	const changeUsername = (e: any) => {
		setUsername(e.target.value);
	};

	const changePassword = (e: any) => {
		setPassword(e.target.value);
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		axios
			.post('/api/auth/signin', {
				username: username,
				password: password,
			})
			.then((response) => {
				dispatch(login(response.data.accessToken));
				setLoginSuccess(true);
			});
	};
	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, width: '25ch' },
				display: 'flex',
				flexDirection: 'column',
			}}
			onSubmit={onSubmit}
		>
			<TextField label="Id" value={username} onChange={changeUsername} />
			<TextField label="password" value={password} onChange={changePassword} />
			<Button variant="outlined" type="submit">
				Account certification
			</Button>
			{loginSuccess ? (
				<Button variant="contained">
					<Link to="/board">Write a Post</Link>
				</Button>
			) : null}
		</Box>
	);
};

export default Login;