import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


export const PostingContainer = styled.div`
	width: 60%;
	min-width: 500px;
	max-width: 1000px;
	min-height: 100vh;
	padding-top: 50px;
	margin: auto;
`;
export const HeaderTitle = styled.div`
	background: #A8B2C7;
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
	background: #A8B2C7;
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
	font-family: 'Pretendard-Regular';
`;

export const Description = styled.div``;

export const OtherPostings = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 7em;
	margin-bottom: 5em;
`;

export const OtherPosting = styled(Link)`
	border-bottom: 1px solid black;
	padding: 1em 1em;
	font-family: 'Pretendard-Regular';
	margin-top: 1em;
	text-decoration: none;
    color: black;
`;

export const CommentForm = styled.form`
	display: table;
    margin-left: auto;
    margin-right: auto;
	padding: 1em;
    margin-top: 3em;
	min-width: 700px;
	border-radius: 10px;
	border: none;
	background-color:#F4F5F5;
`;

export const GuestInfo = styled.div`
	display: grid;
	grid-template-columns: repeat(2,1fr);
    gap: 1em;
	margin-top: 0.7em;
`;

export const Input = styled.input`
    background-color: #DFE2E2;
    border: none;
    border-radius: 5px;
    color: #272B2B;
    height: 2em;
    padding-left: 0.5em;
    padding-right: 0.5em;
	
	&:focus {
		outline: 2px solid #999999;
	}
`;

export const CommentInput = styled.input`
    width: 100%;
    height: 9em;
    margin-top: 1em;
	background-color: #DFE2E2;
    border: none;
    border-radius: 5px;
    color: #272B2B;
    padding-left: 0.5em;
    padding-right: 0.5em;
	font-family: 'Pretendard-Regular';
	
	&:focus {
		outline: 2px solid #999999;
	}
`;

export const Comments = styled.div`
	justify-content: center;
    display: flex;
    margin-top: 3em;
	flex-direction: column;
	align-items: center;
	min-width: 700px;
    width: 700px;
    margin: 3em auto;
`;
export const Comment = styled.div`
    font-family: 'Pretendard-Regular';
	border-top: 1px solid black;
    padding-top: 1em;
	width: 100%;
	padding-bottom: 1em;
`;

export const OtherPostingTitle = styled.div`
	font-family: 'Pretendard-Regular';
	text-align: center;
    margin-bottom: 1em;
    font-size: larger;
    font-weight: bolder;
`;
