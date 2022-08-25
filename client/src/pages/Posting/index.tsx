import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Paper from '@mui/material/Paper';
import { Board } from '@typings/type';
import { motion } from 'framer-motion';
import { Viewer } from '@toast-ui/react-editor';
import axios from 'axios';
import Swal from 'sweetalert2';
import { RootState } from '@store/config';
import { useSelector } from 'react-redux';


const PostingContainer = styled(Container)`
	width: 60%;
	min-width: 500px;
	height: 100vh;
	padding-top: 50px;
`;
const HeadColor = styled.div`
	background: #607eaa;
	width: 100vw;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const HeadTitle = styled.p`
	font-family: 'NanumGothicBold';
	color: #f1f1f1;
	font-size: 3em;
`;
const HeadDescription = styled.p`
	font-family: 'NanumGothicBold';
	color: #f1f1f1;
	font-size: 1em;
`;

const Button = styled(motion.button)`
	height: 32px;
	min-width: 12px;
	padding: 0 10px;
	border: 1px solid #959595;
	box-sizing: border-box;
	outline: none;
	overflow: hidden;
	cursor: pointer;
	transition: all 0.4s ease-out;
`;

const Description = styled.div``;

const Posting = () => {
	const { id } = useParams();
	const { data, error } = useSWR<Board | undefined>(`/api/boards/${id}`, fetcher);
	
	const navigate = useNavigate();
	
	
	// 토큰
	const token = useSelector((state: RootState) => state.token.token);
	
	// 게시물 삭제 시
	const DeleteBoard = (e: any) => {
		e.preventDefault();
		Swal.fire({
			icon: 'warning',
			title: '해당 게시물을 삭제하시겠습니까?',
			text: `${data?.title} (을)를 삭제합니다.`,
			showCancelButton: true,
			confirmButtonText: '삭제',
			cancelButtonText: '취소',
		}).then((res) => {
			if (res.isConfirmed) {
				axios
					.delete(`/api/boards/${id}`, {
						headers: { Authorization: `Bearer ${token}` }
					})
					.then((response) => {
						Swal.fire('게시글이 삭제되었습니다.', '', 'success');
						navigate('/home');
					})
					.catch((e) => {
						console.error(e);
					});
			} else {
				//취소
			}
		});
	};
	
	// 수정 페이지로 이동
	const EditingPost = () => {
		navigate(`/editing/${id}`);
	}
	
	return (
		<React.Fragment>
			<CssBaseline />
			<HeadColor>
				<HeadTitle>{data?.title}</HeadTitle>
				<HeadDescription>
					{data?.mainCategory}.{data?.subCategory}
				</HeadDescription>
			</HeadColor>
			<PostingContainer>
				
				
				<div style={{ width: '100%', height: '100%' }}>
					{data?.description? (<Viewer initialValue={data.description} />) : null}
				</div>
				<div>
					<Button
						style={{ marginRight: '3px' }}
						whileHover={{
							background: 'black',
							color: 'white',
						}}
						onClick={EditingPost}
					>
						수정하기
					</Button>
					<Button
						whileHover={{
							background: 'black',
							color: 'white',
						}}
						
						onClick={DeleteBoard}
					>
						게시물 지우기
					</Button>
				</div>
			</PostingContainer>
		</React.Fragment>
	);
};

export default Posting;