import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BackgroundImg from '@utils/img/background-2.jpg';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import NoImage from '@utils/img/noImage.jpg';
import { motion } from 'framer-motion';

export const HomeContainer = styled.div`
	margin-top: 3rem;
	display: block;
	min-height: 80vh;
	overflow: hidden;
	max-width: 1110px;
	margin: 0 auto;
	padding-right: 1em;
	padding-left: 1em;
`;

export const Background_img = styled.div`
	width: 100vw;
	height: 700px;
	overflow: visible;
	background: url(${BackgroundImg});
	background-position: 50% 50%;
	background-size: cover;
`;

export const HomeItems = styled.div`
	display: flex;
	justify-content: center;
`;
export const HomeLayout = styled.div`
	width: 100%;
	height: 100%;
	background-color: white;
	overflow: hidden;
`;

export const HomeName = styled.div`
	margin-top: 5em;
	width: 100vw;
	height: 2em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: 'Pretendard-Regular';
	font-size: 1.6rem;
`;
export const HomeHr = styled.hr`
	background-color: #fff;
	border: 0;
	height: 1px;
	background-image: linear-gradient(
		to right,
		rgba(0, 0, 0, 0),
		rgba(0, 0, 0, 0.75),
		rgba(0, 0, 0, 0)
	);
`;
export const HomeItem = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding-bottom: 20px;
	padding-top: 1em;
	padding-right: 1em;
	border-radius: 10px;
	@media screen and (max-width: 500px) {
		flex-direction: column-reverse;
	}
	&:hover {
		-webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
		-moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
		-ms-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
		-o-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	}
	transition: background-color 0.5s ease-out;
	-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	-moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	-ms-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	-o-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	-webkit-transition: all 0.25s ease-in-out;
	-moz-transition: all 0.25s ease-in-out;
	-ms-transition: all 0.25s ease-in-out;
	-o-transition: all 0.25s ease-in-out;
	transition: all 0.25s ease-in-out;
`;

export const Thumbnail = styled.div`
	position: relative;
	order: 2;
	flex: 0 0 315px;
	height: 200px;
	background-color: #dfdfdf;
	border-radius: 20px;
	a {
		text-decoration-line: none;
		color: #2f2f2f;
	}
	margin-top: 1em;
`;

export const Image = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	height: 100%;
	background: url(${NoImage});
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	border: 1px solid #7a583a;
	border-radius: 20px;
`;
export const WordContainer = styled.div`
	padding-right: 15px;
	padding-left: 1em;
	@media screen and (max-width: 500px) {
		margin-top: 2em;
	}
	font-family: 'Pretendard-Regular';
`;
export const Contents = styled.h3`
	margin-top: 20px;
	font-size: 30px;
	color: #2f2f2f;
	display: block;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;

	a {
		text-decoration-line: none;
	}
`;

export const Description = styled.p`
	margin-top: 28px;
	max-height: 100px;
	font-size: 15px;
	color: #2f2f2f;
	line-height: 25px;
	display: -webkit-box;
	overflow: hidden;
`;

export const LeftText = styled.p`
	text-decoration: none;
	color: #2f2f2f;
	display: inline-block;
	&:after {
		display: block;
		content: '';
		border-bottom: solid 3px #2c3333;
		transform: scaleX(0);
		transition: transform 250ms ease-in-out;
		transform-origin: 0% 50%;
	}
	&:hover:after {
		transform: scaleX(1);
	}
	font-weight: bolder;
`;

export const ThumnailImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 20px;
`;