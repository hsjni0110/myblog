import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BackgroundImg from '@utils/img/background-2.jpg';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import NoImage from '@utils/img/noImage.jpg';

export const HomeContainer = styled.div`
	margin-top: 3rem;
	min-width: 500px;
	display: block;
	min-height: 80vh;
	overflow: hidden;
	max-width: 1110px;
	margin: 0 auto;
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
	justify-content: center;
	align-items: center;
	font-family: 'Bebas Neue', cursive;
	font-size: 1.6rem;
	border-bottom: 1px solid #7a583a;
`;

export const HomeItem = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding-bottom: 20px;
`;

export const Thumbnail = styled.div`
	position: relative;
	order: 2;
	flex: 0 0 315px;
	height: 200px;
	background-color: #dfdfdf;
	a {
		text-decoration-line: none;
		color: #2f2f2f;
	}
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
`;

export const Contents = styled.h3`
	margin-top: 20px;
	font-size: 30px;
	color: #2f2f2f;
	display: block;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	
	a{
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
	display:inline-block; 
	&:after {
		display: block;
		content: '';
		border-bottom: solid 3px #2C3333;
		transform: scaleX(0);
		transition: transform 250ms ease-in-out;
		transform-origin: 0% 50%;
	}
	&:hover:after { transform: scaleX(1); }
`;