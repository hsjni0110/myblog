import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import styled from 'styled-components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Board } from '@typings/type';
import { Viewer } from '@toast-ui/react-editor';
import Pagination from '@mui/material/Pagination';
import { motion } from 'framer-motion';

import {
	HomeContainer,
	Background_img,
	HomeItem,
	Thumbnail,
	HomeLayout,
	HomeName,
	Image,
	Description,
	Contents,
	LeftText,
	WordContainer,
} from './styles';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';

const Background_img_cover = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100vw;
	height: 700px;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	font-weigth: 700;
	font-size: 4rem;
	color: white;
	font-family: 'Pretendard-Regular';
`;
const Home = () => {
	const { data: board_data, error } = useSWR('/api/boards', fetcher);

	const { data: categoryData, error: categoryError } = useSWR('/api/categorys', fetcher);
	
	
	// 전체 게시글 데이터
	const [alldata, setAllData] = useState<Board[] | undefined>();
	// 현재 페이지
	const [page, setPage] = useState(1);
	// 보여줄 데이터 목록
	const [data, setData] = useState<Board[]>();

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
		// 타입 가드를 통해서 데이터가 있을 시에만 값을 설정할 수 있도록 함
	}, [board_data]);

	useEffect(() => {
		if (alldata) {
			if (alldata?.length % 5 === 0) {
				setLastPage(() => Math.floor(alldata?.length / 5));
			} else {
				setLastPage(() => Math.floor(alldata?.length / 5 + 1));
			}
		}
	}, [alldata]);

	useEffect(() => {
		if (alldata) {
			if (page === lastPage) {
				setData(() => alldata?.slice(5 * (page - 1)));
			} else {
				setData(() => alldata?.slice(5 * (page - 1), 5 * (page - 1) + 5));
			}
		}
	}, [page, alldata]);

	const handlePage = (event: any) => {
		const nowPageInt = parseInt(event.target.outerText);
		setPage(nowPageInt);
		window.scrollTo(0, 0);
	};
	return (
		<HomeLayout>
			<CssBaseline />
			<Background_img_cover>DEVREPO</Background_img_cover>
			<Background_img />

			<HomeName>Newest</HomeName>
			<HomeContainer>
				{data?.map((homeContent: Board) => (
					<div
						key={homeContent.id}
						style={{ marginTop: '100px', borderBottom: '1px solid #e6e6e6' }}
					>
						<HomeItem>
							<Thumbnail>
								<Link to={`/posting/${homeContent?.id}`}>
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
												{homeContent.mainCategory} -{' '}
												{homeContent.subCategory}
											</strong>
										</div>
									</div>

									<Contents>
										<Link to={`/posting/${homeContent?.id}`}>
											<LeftText>{homeContent.title}</LeftText>
										</Link>
									</Contents>

									<Description>
										{homeContent?.description
											? getPureText(homeContent.description)
											: null}
									</Description>
								</div>
							</WordContainer>
						</HomeItem>
					</div>
				))}
			</HomeContainer>
			<Pagination
				sx={{ display: 'flex', justifyContent: 'center', marginTop: '5em' }}
				count={lastPage}
				onChange={(e) => handlePage(e)}
			/>
		</HomeLayout>
	);
};

export default Home;