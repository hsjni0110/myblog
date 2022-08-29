import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { login, logout } from '@store/slice/accessTokenSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/config';
import { Link } from 'react-router-dom';
import { Modal, ModalWrap } from './styles';
import styled from 'styled-components';


interface ILoginModal {
	setLoginSuccess: (loginSuccess: boolean) => void;
	setLoginModal: (modalClick: boolean) => void;
}

const Label = styled.div``;
const Input = styled.input`
	margin-bottom: 10px;
	width: 100%;
    margin-top: 10px;
    font-size: 15px;
`;

const SubmitButton = styled.button``;
const LoginModal = ({ setLoginSuccess, setLoginModal }: ILoginModal) => {
	const dispatch = useDispatch();

	// 유저 이름 및 패스워드 State
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	// 유저 이름 handling function
	const changeUsername = (e: any) => {
		setUsername(e.target.value);
	};

	// 비밀번호 handling function
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
				setLoginModal(false);
			})
			.catch((e) => {
				console.error(e);
		})
	};

	// wrap 클릭 시
	const onClickWrap = (e: any) => {
		e.preventDefault();
		setLoginModal(false);
	};
	
	// modal 클릭 시 버블링 방지
	const onClickModal = (e:any) => {
		e.stopPropagation()
	}
	return (
		<ModalWrap onClick={onClickWrap} initial={{opacity: 0}} animate={{opacity: 1}} exit={{ opacity:0}}>
			<Modal onClick={onClickModal}>
				<div style={{ padding: '5px' }}>
					<Label>Username</Label>
					<Input value={username} onChange={changeUsername} />
					<Label>Password</Label>
					<Input type="password" value={password} onChange={changePassword} />
					<SubmitButton onClick={onSubmit}>Submit</SubmitButton>
				</div>
			</Modal>
		</ModalWrap>
	);
};

export default LoginModal;