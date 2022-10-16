import styled from 'styled-components';
import { motion } from 'framer-motion';
export const ThumnailPickContainer = styled.div`
    width: 40vw;
    height: 45vh;
	background-color: rgba(215, 213, 215, 0.95);
	border: none;
	padding: 1em;
	border-radius: 20px;
`;

export const ThumnailWrap = styled.div`
	position:fixed;
	width:100vw;
	height: 100vh;
	display:flex;
	justify-content:center;
	align-items:center;
	left:0;
	top:0;
`;

export const ThumnailGrid = styled.div`
	display:grid;
	grid-template-columns: repeat(3, 1fr);
	width: 100%;
	height: 70%;
    border: 1px solid black;
    border-radius: 10px;
	overflow: scroll;
	grid-gap:1em;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const Img = styled.img`
	&:hover {
		border: 1px solid black;
	}
	&:focus {
		outline: 1px solid #ba3d3b;
	}
`;

export const Option = styled.option`
	cursor: pointer;
	font-family: 'Pretendard-Regular';
`;

export const Button = styled(motion.button)`
	height: 32px;
	min-width: 12px;
	padding: 0 10px;
	box-sizing: border-box;
	outline: none;
	overflow: hidden;
	cursor: pointer;
	font-family: 'Pretendard-Regular';
	border-radius: 10px;
    border: none;
`;

export const Select = styled.select`
	font-family: 'Pretendard-Regular';
	margin-left: 1em;
	cursor: pointer;
	word-wrap: break-word;
	line-height: 1em;
	white-space: normal;
	outline: 0;
	-webkit-transform: rotateZ(0);
	transform: rotateZ(0);
	min-width: 14em;
	min-height: 2.71428571em;
	background: #fff;
	display: inline-block;
	padding: 0.78571429em 2.1em 0.78571429em 1em;
	color: rgba(0, 0, 0, 0.87);
	-webkit-box-shadow: none;
	box-shadow: none;
	border: 1px solid rgba(34, 36, 38, 0.15);
	border-radius: 0.28571429rem;
	-webkit-transition: width 0.1s ease, -webkit-box-shadow 0.1s ease;
	transition: width 0.1s ease, -webkit-box-shadow 0.1s ease;
	transition: box-shadow 0.1s ease, width 0.1s ease;
	transition: box-shadow 0.1s ease, width 0.1s ease, -webkit-box-shadow 0.1s ease;
`;

export const H1 = styled.h1`
	font-family: 'Pretendard-Regular';
	display: inline-block;
`;