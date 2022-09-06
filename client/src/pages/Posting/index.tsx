import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
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
import {
	PostingContainer,
	Header,
	HeaderTitle,
	HeadTitle,
	HeadDescription,
	Button,
	Description,
	OtherPostings,
	OtherPosting,
	HeaderSVG,
} from './styles';
import { useState, useEffect } from 'react';

const Posting = () => {
	const { id } = useParams();
	const { data, error } = useSWR<Board | undefined>(`/api/boards/${id}`, fetcher);

	const navigate = useNavigate();

	// 전체 카테고리 별 데이터
	const [alldata, setAllData] = useState<Board[] | undefined>();

	const [mainCategory, setMainCategory] = useState<string>();
	const [subCategory, setSubCategory] = useState<string>();

	// slice한 데이터
	const [sliceData, setSliceData] = useState<Board[] | undefined>();

	useEffect(() => {
		if (data) {
			setMainCategory(data.mainCategory);
			setSubCategory(data.subCategory);
		}
	}, [data]);
	useEffect(() => {
		axios
			.post('/api/boards/category', {
				mainCategory: mainCategory,
				subCategory: subCategory,
			})
			.then((res) => {
				setAllData(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [mainCategory, subCategory]);

	useEffect(() => {
		if (alldata && alldata?.length > 5) {
			setSliceData(alldata?.slice(0, 5));
		} else {
			setSliceData(alldata);
		}
	}, [alldata]);

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
						headers: { Authorization: `Bearer ${token}` },
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
	};

	return (
		<React.Fragment>
			<CssBaseline />
			{!data ? (
				<div style={{ height: '100vh' }}>isLoading...</div>
			) : (
				<>
					<Header>
						<HeaderTitle></HeaderTitle>
						<HeaderSVG
							className="curve curve--top"
							width="100%"
							height="50"
							viewBox="0 0 200
							45.68"
							preserveAspectRatio="none"
						>
							<path
								fill="white"
								d="M0,8C33.65-10.84,50.37,29.77,68.88,29.77S117.26,0,149.26,0,200,25.55,200,25.55V45.68H0Z"
							></path>
						</HeaderSVG>
					</Header>
					<PostingContainer>
						<div
							style={{
								width: '100%',
								height: '100%',
								fontFamily: 'Pretendard-Regular',
							}}
						>
							{data?.description ? <Viewer initialValue={data.description} /> : null}
						</div>

						<OtherPostings>
							<div style={{ fontFamily: 'Pretendard-Regular' }}>
								이 카테고리의 다른 글
							</div>
							{sliceData?.map((data: Board) => (
								<OtherPosting>{data?.title}</OtherPosting>
							))}
						</OtherPostings>

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
				</>
			)}
		</React.Fragment>
	);
};

export default Posting;