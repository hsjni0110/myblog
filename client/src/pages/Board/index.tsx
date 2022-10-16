import TextareaAutosize from '@mui/material/TextareaAutosize';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Category_data } from '@typings/type';
import { useSelector } from 'react-redux';
import { RootState } from '@store/config';
import PostingImg from '@utils/img/posting.jpg';
import Editor from '@components/Editor';
import { useNavigate } from 'react-router-dom';
import {
	ThumnailPickContainer,
	ThumnailWrap,
	ThumnailGrid,
	Img,
	Button,
	Select,
	H1,
	Option,
} from './styles';

const BoardContainer = styled(Container)`
	width: 60%;
	min-width: 500px;
	display: flex;
	flex-direction: column;
`;

const PostingBaseImg = styled.div`
	background: url(${PostingImg});
	background-size: cover;
	width: 100vw;
	height: 200px;
	margin-bottom: 100px;
`;
const PostingBasImgCover = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 200px;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	font-weigth: 700;
	font-size: 4rem;
	color: white;
`;

const TitleInput = styled.input`
	height: 48px;
	background: #fff;
	border: 1px solid #767676;
	font-size: 17px;
	color: #2b2b2b;
	padding-left: 16px;
	padding-right: 16px;
	margin-bottom: 10px;
`;

const Board = () => {
	const navigate = useNavigate();
	// 카테고리 리스트 받기
	const { data, error } = useSWR<Category_data[]>('/api/categorys', fetcher);

	const [textValue, setTextValue] = useState('');
	const [titleValue, setTitleValue] = useState('');

	const token = useSelector((state: RootState) => state.token.token);

	// 카테고리 변수
	const [MainCategory, setMainCategory] = useState('');
	const [SubCategory, setSubCategory] = useState('');

	/* 결정한 썸네일 */
	const [postThumnail, setPostThumnail] = useState('');

	const handleMainCategory = (e: any) => {
		setMainCategory(e.target.value);
	};

	const handleSubCategory = (e: any) => {
		setSubCategory(e.target.value);
	};

	const handleTitleValue = (e: any) => {
		setTitleValue(e.target.value);
	};

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	const onSubmit = (e: any) => {
		e.preventDefault();

		axios
			.post(
				'api/boards',
				{
					title: titleValue,
					description: textValue,
					mainCategory: MainCategory,
					subCategory: SubCategory,
					ThumnailUrl: postThumnail,
				},
				config
			)
			.then((response) => {
				navigate('/home');
			})
			.catch((e) => {
				console.error(e);
			});
	};

	/* 썸네일 urlList */
	const [urlList, setUrlList] = useState<string[]>(['./noImage.jpg']);

	/* 썸네일 url 추가 변수 */
	const [url, setUrl] = useState<string>('');

	// 썸네일 on/off 버튼
	const [thumnailSwitch, setThumanilSwitch] = useState<boolean>(false);

	const onSwitchThumnail = (e: any) => {
		e.preventDefault();
		setThumanilSwitch(true);
	};

	const onClickWrap = (e: any) => {
		e.preventDefault();
		setThumanilSwitch(false);
	};

	/* 버블링 방지 */
	const preventBubbling = (e: any) => {
		e.stopPropagation();
	};

	/* url 추가 시 urlList에 추가 */
	useEffect(() => {
		if (url !== '') {
			setUrlList([...urlList, url]);
		}
	}, [url]);

	/* 썸네일 클릭 시 */
	const onClickThumnail = (e: any) => {
		e.preventDefault();
		setPostThumnail(e.target.currentSrc);
	};

	const ConcludeThum = (e: any) => {
		e.preventDefault();
		setThumanilSwitch(false);
	};
	return (
		<>
			<PostingBaseImg />
			<PostingBasImgCover />
			<BoardContainer>
				<TitleInput value={titleValue} onChange={handleTitleValue} />
				<Editor
					contentValue={textValue}
					setContentValue={setTextValue}
					url={url}
					setUrl={setUrl}
				/>

				<div style={{ marginTop: '5em' }}>
					<H1>메인 카테고리</H1>
					<Select onChange={handleMainCategory} value={MainCategory}>
						<Option value="none">=== 선택 ===</Option>
						{data?.map((item) => (
							<Option value={item.category_name} key={item.id}>
								{item.category_name}
							</Option>
						))}
					</Select>

					<H1 style={{ marginLeft: ' 3em' }}>서브 카테고리</H1>
					<Select onChange={handleSubCategory} value={SubCategory}>
						<Option value="none">=== 선택 ===</Option>
						{data?.map((sub) =>
							sub.category_name === MainCategory
								? sub.subCategorys.map((item) => (
										<Option value={item.category_name} key={item.id}>
											{item.category_name}
										</Option>
								  ))
								: null
						)}
					</Select>

					<Button onClick={onSwitchThumnail} style={{ marginLeft: '4em' }}>
						썸네일 선택하기
					</Button>

					<Button type="submit" onClick={onSubmit} style={{marginLeft:"3em"}}>
						전송
					</Button>
					{thumnailSwitch ? (
						<ThumnailWrap onClick={onClickWrap}>
							<ThumnailPickContainer onClick={preventBubbling}>
								<ThumnailGrid>
									{urlList.map((thumnail) => (
										<div onClick={onClickThumnail}>
											<Img
												style={{
													objectFit: 'contain',
													width: '100%',
													height: '100%',
												}}
												src={thumnail}
											/>
										</div>
									))}
								</ThumnailGrid>
								<div
									style={{
										display: 'flex',
										justifyContent: 'end',
										alignItems: 'center',
										height: '30%',
									}}
								>
									<Button onClick={ConcludeThum}>썸네일 결정</Button>
								</div>
							</ThumnailPickContainer>
						</ThumnailWrap>
					) : null}
				</div>
			</BoardContainer>
		</>
	);
};
export default Board;