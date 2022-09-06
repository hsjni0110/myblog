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
import {
	HomeItem,
	Description,
	Contents,
	LeftText,
	Thumbnail,
	Image,
	WordContainer,
} from '@pages/Home/styles';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';

const CategoryPageContainer = styled(Container)`
	padding-right: 1em;
	padding-left: 1em;
	margin-top: 3rem;
	display: block;
	min-height: 80vh;
	overflow: hidden;
	max-width: 1110px;
	margin: 0 auto;
`;

const CategoryNameContainter = styled.div`
	padding: 0 30px;
	max-width: 1250px;
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
	a {
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
	left: 0;
	top: 0;
	width: 100%;
	height: 500px;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	font-weigth: 700;
	font-size: 4rem;
	color: white;
`;
const CategoryPage = () => {
	const { main, sub } = useParams();

	// 게시판 데이터
	const { data: board_data, error } = useSWR<Board[] | undefined>('/api/boards', fetcher);

	// 전체 게시글 데이터
	const [alldata, setAllData] = useState<Board[] | undefined>();

	// 현재 페이지
	const [page, setPage] = useState(1);
	// 보여줄 카테고리 별 데이터 목록
	const [newData, setNewData] = useState<Board[] | undefined>();

	// 보여줄 데이터 목록
	const [data, setData] = useState<Board[] | undefined>();
	// 마지막 페이지 수
	const [lastPage, setLastPage] = useState<number>();

	const getPureText = (htmlText: string) => {
		const pureText = htmlText.replace(/<[^>]*>?/g, '');
		return pureText;
	};

	// 데이터 정보가 들어올시, 전체 데이터를 reverse()해서 초기화, 마지막 페이지 수 정의
	useEffect(() => {
		// data형태가 const이므로 변형이 불가능 -> 따라서 slice를 통해 복사 후 reverse하여 data정의
		if (board_data) {
			setAllData(() => board_data?.slice(0).reverse());
		}
	}, [board_data]);

	// 모든 데이터 중 카테고리 별 데이터로 변환
	useEffect(() => {
		if (alldata) {
			setNewData(() => {
				return alldata.filter((category_page_data: Board) => {
					if (
						category_page_data.mainCategory === main &&
						category_page_data.subCategory === sub
					) {
						return true;
					} else {
						return false;
					}
				});
			});
		}
	}, [alldata, main]);
	useEffect(() => {
		if (newData) {
			if (newData?.length % 5 === 0) {
				setLastPage(() => Math.floor(newData?.length / 5));
			} else {
				setLastPage(() => Math.floor(newData?.length / 5 + 1));
			}
		}
	}, [newData]);

	// 데이터를 5개 별로 slice함
	useEffect(() => {
		if (newData) {
			if (page === lastPage) {
				setData(() => newData?.slice(5 * (page - 1)));
			} else {
				setData(() => newData?.slice(5 * (page - 1), 5 * (page - 1) + 5));
			}
		}
	}, [page, newData]);

	const handlePage = (event: any) => {
		const nowPageInt = parseInt(event.target.outerText);
		setPage(nowPageInt);
	};

	return (
		<React.Fragment>
			<CssBaseline />
			{!data? (<div>isLoading...</div>) : (
			 <>
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
				{data?.map((category_page_data) => (
					<div
						key={category_page_data.id}
						style={{ marginTop: '100px', borderBottom: '1px solid #e6e6e6' }}
					>
						<HomeItem>
							<Thumbnail>
								<Link to={`/posting/${category_page_data?.id}`}>
									<Image />
								</Link>
							</Thumbnail>

							<WordContainer>
								<div style={{ maxWidth: '639px' }}>
									<div className="category">
										<div
											style={{
												fontSize: '12px',
												color: '#b7b7b7',
												lineHeight: '16px',
											}}
										>
											<strong>
												{category_page_data.mainCategory} -{' '}
												{category_page_data.subCategory}
											</strong>
										</div>
									</div>

									<Contents>
										<Link to={`/posting/${category_page_data?.id}`}>
											<LeftText>{category_page_data.title}</LeftText>
										</Link>
									</Contents>

									<Description>
										{category_page_data?.description
											? getPureText(category_page_data.description)
											: null}
									</Description>
								</div>
							</WordContainer>
						</HomeItem>
					</div>
				))}
			</CategoryPageContainer>
			<Pagination
				sx={{ display: 'flex', justifyContent: 'center', marginTop: '5em' }}
				count={lastPage}
				onChange={(e) => handlePage(e)}
			/>
			</>
			)}
			
		</React.Fragment>
	);
};

export default CategoryPage;