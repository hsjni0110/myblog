import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';


export const PostingContainer = styled.div`
	width: 60%;
	min-width: 500px;
	max-width: 1000px;
	min-height: 100vh;
	padding-top: 50px;
	margin: auto;
`;
export const HeaderTitle = styled.div`
	background: #607eaa;
	display: flex;
	width: 100vw;
	height: 300px;
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 0;
	left: 0;
	font-size: 2.5em;
    align-items: center;
    color: white;
    font-weight: bold;
	font-family: 'Pretendard-Regular';
	flex-direction: column;
`;
export const Header = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 500px;
	background: #607eaa;
	position: relative;
`;

export const HeaderSVG = styled.svg`
	position: absolute;
    bottom: 0;
`;

export const HeadTitle = styled.p`
	font-family: 'Pretendard-Regular';
	color: #f1f1f1;
	font-size: 3em;
`;
export const HeadDescription = styled.p`
	font-family: 'Pretendard-Regular';
	color: #f1f1f1;
	font-size: 1em;
`;

export const Button = styled(motion.button)`
	height: 32px;
	min-width: 12px;
	padding: 0 10px;
	border: 1px solid #959595;
	box-sizing: border-box;
	outline: none;
	overflow: hidden;
	cursor: pointer;
	transition: all 0.4s ease-out;
	font-family: ‘SUIT’, sans-serif;
`;

export const Description = styled.div``;

export const OtherPostings = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 7em;
	margin-bottom: 5em;
`;

export const OtherPosting = styled.a`
	border: 1px solid black;
	padding: 1em 1em;
	font-family: 'Pretendard-Regular';
	margin-top: 1em;
	border-radius: 35% 37% 37% 35% / 14% 19% 17% 12%;
`;