import styled from 'styled-components';
import { motion } from "framer-motion"

export const EditBackground = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	left:0;
	top:0;
	display: flex;
	justify-content:center;
	align-items:center;
	background: rgba(0,0,0,0.5);
`;

export const EditDiv = styled.div`
	height: 250px;
	background: #C2D2B2;
    border-radius: 15px;
    width: 600px;
	padding-left: 1em;
    padding-right: 1em;
	padding-bottom: 1em;
`;

export const EditInput = styled.textarea`
    margin-top: 2em;
    width: 100%;
    height: 70%;
	border: none;
    border-radius: 10px;
	margin-bottom: 1em;
	padding: 1em;
	font-family: 'Pretendard-Regular';
	resize:none;
	&:focus {
		outline:none;
	}
`;

export const Popper = styled.div`
	position: absolute;
	width: 100px;
	height: 70px;
	background: #f3f5f7;
	right: 2em;
	border-radius: 10px;
	border: none;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: 'Pretendard-Regular';
`;

export const CommentEditContainer = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #ebeaeb;
	height: 200px;
	width: 250px;
	border-radius: 20px;
`;

export const Input = styled.input`
	border-radius: 8px;
	padding-top: 0.2em;
	padding-bottom: 0.2em;
	padding-left: 0.7em;
	margin-bottom: 1em;
	border: none;
	font-family: 'Pretendard-Regular';
`;
export const Button = styled.button`
	border-radius: 7px;
	height: 2em;
	border: none;
	background: #d4cac4;
	color: black;
	font-family: 'Pretendard-Regular';
	cursor: pointer;
`;

export const Information = styled(motion.div)`
	position: fixed;
	bottom: 3em;
	margin: 0 auto;
	left: 0;
	right: 0;
	width: 200px;
	height: 70px;
    width: 400px;
	display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    color: white;
    background: rgba(87, 101, 117,0.7);
`;