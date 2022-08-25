import TextareaAutosize from '@mui/material/TextareaAutosize';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Category_data } from '@typings/type';
import { useSelector } from 'react-redux';
import { RootState } from '@store/config';
import PostingImg from '@utils/img/posting.jpg';
import ToastEditor from '@components/ToastEditor';
import { Editor } from '@toast-ui/react-editor';

const BoardContainer = styled(Container)`
	width: 60%;
	min-width: 500px;
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
	width: calc(100% - 77px);
	height: 48px;
	background: #fff;
	border: 1px solid #767676;
	font-size: 17px;
	color: #2b2b2b;
	padding-left: 16px;
	padding-right: 16px;
	margin-bottom: 10px;
`;
const Select = styled.select`
	cursor: pointer;
    word-wrap: break-word;
    line-height: 1em;
    white-space: normal;
    outline: 0;
    -webkit-transform: rotateZ(0);
    transform: rotateZ(0);
    min-width: 14em;
    min-height: 2.71428571em;
    background: #fff;
    display: inline-block;
    padding: 0.78571429em 2.1em 0.78571429em 1em;
    color: rgba(0,0,0,.87);
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid rgba(34,36,38,.15);
    border-radius: 0.28571429rem;
    -webkit-transition: width .1s ease,-webkit-box-shadow .1s ease;
    transition: width .1s ease,-webkit-box-shadow .1s ease;
    transition: box-shadow .1s ease,width .1s ease;
    transition: box-shadow .1s ease,width .1s ease,-webkit-box-shadow .1s ease;
`;

const Option = styled.option`
    cursor: pointer;
`;
const Board = () => {
	
	const editorRef = useRef<Editor | undefined>();
	
	// 카테고리 리스트 받기
	const { data, error } = useSWR<Category_data[]>('/api/categorys', fetcher);

	const [textValue, setTextValue] = useState('');
	const [titleValue, setTitleValue] = useState('');

	const token = useSelector((state: RootState) => state.token.token);

	// 카테고리 변수
	const [MainCategory, setMainCategory] = useState('');
	const [SubCategory, setSubCategory] = useState('');

	const handleMainCategory = (e:any) => {
		setMainCategory(e.target.value)
	}
	
	const handleSubCategory = (e:any) => {
		setSubCategory(e.target.value);
	}

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
					description: editorRef?.current?.getInstance().getHTML(),
					mainCategory: MainCategory,
					subCategory: SubCategory,
				},
				config
			)
			.then((response) => {})
			.catch((e) => {
				console.error(e);
			});
	};
	

	return (
		<>
			<PostingBaseImg />
			<PostingBasImgCover />
			<BoardContainer>
				<TitleInput value={titleValue} onChange={handleTitleValue} />
				<ToastEditor editorRef={editorRef} />
				
			
				<div style={{marginTop:"2em"}}>
					<Select onChange={handleMainCategory} value={MainCategory}>
						<Option value="none">=== 선택 ===</Option>
						{data?.map((item) => (
							<Option value={item.category_name} key={item.id}>
							{item.category_name}
							</Option>
						))}
					</Select>
					
					<Select onChange={handleSubCategory} value={SubCategory}>
						<Option value="none">=== 선택 ===</Option>
						{data?.map((sub) => (
							sub.category_name === MainCategory? (
								sub.subCategorys.map((item) => (
									<Option value={item.category_name} key={item.id}>
									{item.category_name}
									</Option>
								))
							) : null
							
						))}
					</Select>
				</div>
				<button type="submit" onClick={onSubmit}>전송</button>
				
			
			</BoardContainer>
				
		</>
	);
};
export default Board;