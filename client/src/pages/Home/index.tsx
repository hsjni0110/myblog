import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import styled from 'styled-components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Board } from '@typings/type';
import Divider from '@mui/material/Divider';
import { Viewer } from '@toast-ui/react-editor';

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
} from './styles';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Background_img_cover = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 700px;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	font-weigth: 700;
	font-size: 4rem;
	color: white;
`;
const Home = () => {

	const { data:board_data, error } = useSWR('/api/boards', fetcher);
	
	const getPureText = (htmlText: string) => {
		const pureText = htmlText.replace(/<[^>]*>?/g, '');
		return pureText;
	};
	
	return (
		<HomeLayout>
			<CssBaseline />
			<Background_img_cover>DEVREPO</Background_img_cover>
			<Background_img />

			<HomeName>Newest</HomeName>
			<HomeContainer>
				{board_data?.map((homeContent: Board) => (
					<div style={{ marginTop: '100px', borderBottom: '1px solid #e6e6e6' }}>
						<HomeItem>
							<Thumbnail>
								<Link to={`/posting/${homeContent?.id}`}>
									<Image />
								</Link>
							</Thumbnail>

							<div style={{ paddingRight: '15px' }}>
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
											{homeContent.title}
										</Link>
									</Contents>

									<Description>
										{homeContent?.description
											? getPureText(homeContent.description)
											: null}
									</Description>
								</div>
							</div>
						</HomeItem>
					</div>
				))}
			</HomeContainer>
		</HomeLayout>
	);
};

export default Home;