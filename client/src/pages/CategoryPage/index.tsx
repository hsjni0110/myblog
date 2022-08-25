import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Board } from '@typings/type';
import { useParams } from 'react-router-dom';
import CategoryImg from '@utils/img/categoryPage.jpg';
import { Link } from 'react-router-dom';

const CategoryPageContainer = styled(Container)`
	padding: 0 30px;
	max-width: 1110px;
	margin: 0 auto;
	width: 100%;
	min-height: 70vh;
`;

const CategoryNameContainter = styled.div`
	padding: 0 30px;
	max-width: 1110px;
	margin: 0 auto;
	width: 100%;
`;
const Content = styled.div`
	border-bottom: 1px solid #252525;
`;

const Text = styled.div`
	display: inline-block;
	padding: 0 4px 1px;
	font-size: 14px;
	font-weight: 600;
	border-bottom: 1px solid #252525;
`;
const BaseImg = styled.div`
	background: url(${CategoryImg});
	background-repeat: no-repeat;
	background-size: cover;
	width: 100vw;
	height: 500px;
	background-position: 50% 50%;

	margin-bottom: 3rem;
`;

const Title = styled.h3`
	margin-top: 20px;
	font-size: 30px;
	display: block;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	a{
		color: #2f2f2f;
		text-decoration: none;
		font-family: 'Bebas Neue', cursive;
	}
`;

const CategoryContent = styled.p`
	margin-top: 28px;
	max-height: 100px;
	font-size: 15px;
	color: #2f2f2f;
	line-height: 25px;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	overflow: hidden;
`;

const BaseImgCover = styled.div`
	position: absolute;
	left:0;
	top: 0;
	width: 100%;
	height: 500px;
	background-color: rgba(0,0,0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	font-weigth: 700;
	font-size: 4rem;
	color: white;
`
const CategoryPage = () => {
	const { main, sub } = useParams();

	// 게시판 데이터
	const { data: board_data, error } = useSWR<Board[] | undefined>('/api/boards', fetcher);

	return (
		<React.Fragment>
			<CssBaseline />
			<BaseImg />
			<BaseImgCover />
			<CategoryNameContainter>
				<Content>
					<Text>
						<h2 style={{ display: 'inline-block', fontSize: 'inherit' }}>{main}</h2>
					</Text>
				</Content>
			</CategoryNameContainter>
			<CategoryPageContainer>
				{board_data?.map((data) =>
					data?.mainCategory === main ? (
						data?.subCategory === sub ? (
							<div style={{ marginTop: '100px' }} className="list-item">
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										width: '100%',
									}}
									className="list-item-inner"
								>
									<div className="content">
										<div className="content-inner">
											<Title>
												<Link to={`../../posting/${data.id}`}>
													{data.title}
												</Link>
											</Title>
											<CategoryContent>{data.description}</CategoryContent>
										</div>
									</div>
								</div>
							</div>
						) : null
					) : null
				)}
			</CategoryPageContainer>
		</React.Fragment>
	);
};

export default CategoryPage;