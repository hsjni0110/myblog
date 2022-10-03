import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Paper from '@mui/material/Paper';
import { Board } from '@typings/type';
import { motion } from 'framer-motion';
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
	CommentForm,
	GuestInfo,
	Input,
	CommentInput,
	Comments,
	Comment,
	OtherPostingTitle,
} from './styles';
import { useState, useEffect } from 'react';
import Dompurify from 'dompurify';
import { CommentType } from '@typings/type/index';
import SettingsIcon from '@mui/icons-material/Settings';

const Posting = () => {
	const { id } = useParams();

	const { data, error, mutate } = useSWR<Board | undefined>(`/api/boards/${id}`, fetcher);
	const [commentData, setCommentData] = useState<CommentType[]>([]);

	const navigate = useNavigate();

	// 전체 카테고리 별 데이터
	const [alldata, setAllData] = useState<Board[] | undefined>();

	const [mainCategory, setMainCategory] = useState<string>();
	const [subCategory, setSubCategory] = useState<string>();

	const [nickname, setNickname] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [comment, setComment] = useState<string>('');

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
				setAllData(res.data?.slice(0).reverse());
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

	const loginState = useSelector((state: RootState) => state.loginState.loginState);

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

	const handleNickname = (e: any) => {
		setNickname(e.target.value);
	};

	const handlePassword = (e: any) => {
		setPassword(e.target.value);
	};

	const handleComment = (e: any) => {
		setComment(e.target.value);
	};

	// 댓글 등록
	const registerComment = (e: any) => {
		e.preventDefault();

		axios
			.post(`/api/comments/${id}`, {
				name: nickname,
				contents: comment,
				password,
			})
			.then((response) => {
				mutate();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		let isComponentMounted = true;
		if (data) {
			if (isComponentMounted) {
				setCommentData(data.comments.slice(0).reverse());
			}
		}
		return () => {
			isComponentMounted = false;
		};
	}, [data]);

	return (
		<React.Fragment>
			<CssBaseline />
			{!data ? (
				<div style={{ height: '100vh' }}>isLoading...</div>
			) : (
				<>
					<Header>
						<HeaderTitle>
							<Link
								style={{
									fontSize: '0.5em',
									color: '#DAE0F2',
									textDecorationLine: 'none',
								}}
								to={`/categorys/${data.mainCategory}/${data.subCategory}`}
							>
								{data?.subCategory}
							</Link>
							<h1>{data?.title}</h1>
						</HeaderTitle>
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
								minHeight: '70vh',
							}}
						>
							{data?.description ? (
								<div
									dangerouslySetInnerHTML={{
										__html: Dompurify.sanitize(data?.description),
									}}
								/>
							) : (
								<div />
							)}
						</div>

						<OtherPostings>
							<OtherPostingTitle>이 카테고리의 다른 글</OtherPostingTitle>
							{sliceData?.map((data: Board) => (
								<OtherPosting to={`/posting/${data?.id}`}>
									{data?.title}
								</OtherPosting>
							))}
						</OtherPostings>

						{loginState ? (
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
						) : null}
					</PostingContainer>

					<hr />

					<CommentForm>
						<p style={{ fontFamily: 'Pretendard-Regular' }}>
							비밀번호는 작성하시는 댓글의 수정/삭제 용도입니다.
						</p>
						<GuestInfo>
							<Input
								placeholder="닉네임(익명)"
								value={nickname}
								onChange={handleNickname}
							/>
							<Input
								placeholder="비밀번호"
								value={password}
								onChange={handlePassword}
							/>
						</GuestInfo>
						<CommentInput
							placeholder="댓글 입력"
							value={comment}
							onChange={handleComment}
						/>
						<Button
							style={{
								marginTop: '1em',
								borderRadius: '7px',
								border: 'none',
								backgroundColor: '#DFE2E2',
							}}
							onClick={registerComment}
						>
							전송하기
						</Button>
					</CommentForm>

					<Comments>
						{commentData?.map((cmt: any) => (
							<Comment key={cmt.id}>
								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									<div style={{ display: 'flex', justifyContent: 'start' }}>
										<h1>{cmt.name}</h1>
										<h1
											style={{
												paddingLeft: '1em',
												fontSize: 'smaller',
												color: '#A4A0A6',
											}}
										>
											{cmt.createdAt.substr(0, 10)}
										</h1>
									</div>
									<SettingsIcon fontSize="small" color="action" />
								</div>
								<h1 style={{ color: '#726D74', marginTop: '1em' }}>
									{cmt.contents}
								</h1>
							</Comment>
						))}
					</Comments>
				</>
			)}
		</React.Fragment>
	);
};

export default Posting;