import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@store/slice/accessTokenSlice';
import { RootState } from '@store/config';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

interface ILogin {
	loginSuccess: boolean;
	setLoginSuccess: (login: boolean) => void;
}

const FooterContainter = styled.div`
	width: 100vw;
	height: 26vh;
	margin-top: 5em;
	background: rgba(16, 15, 15,0.8);
	color: #f1f1f1;
	bottom: 0;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	font-family: 'Bebas Neue', cursive;
`;

const InfomationComment = styled.div`
	color: inherit;
	display: grid;
	grid-template-areas:
		'header header'
		'a a';
	gap: 1em;
`;

const SNSConnect = styled.div`
	color: inherit;
`;

const AdminLogin = styled.form`
	color: inherit;
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	gap: 1em;
`;

const Footer = ({ loginSuccess, setLoginSuccess }: ILogin) => {
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
		<>
			<FooterContainter>
				<InfomationComment>
					<div style={{ gridArea: 'header' }}>I made a blog with these techniques</div>
					<div
						style={{
							display: 'grid',
							gridArea: 'a',
							gridTemplateColumns: 'repeat(2,1fr)',
							gap: '2em',
						}}
					>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div>- FrontEnd -</div>
							<div>React.js(CRA) with Typescript</div>
							<div>React Toolkit</div>
							<div>SWR</div>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div>- BackEnd -</div>
							<div>Nest.js</div>
							<div>MySQL</div>
						</div>
					</div>
				</InfomationComment>

				<SNSConnect>
				</SNSConnect>
				<AdminLogin onSubmit={onSubmit}>
					<div>Account Verification</div>
					<TextField
						label="username"
						id="outlined-size-small"
						size="small"
						value={username}
						onChange={changeUsername}
					/>
					<TextField
						label="password"
						id="outlined-size-small"
						size="small"
						type="password"
						value={password}
						onChange={changePassword}
					/>
					<Button type="submit" variant="outlined">
						Submit
					</Button>
				</AdminLogin>
			</FooterContainter>
		</>
	);
};

export default Footer;