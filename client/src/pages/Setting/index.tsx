import * as React from 'react';
import PostingImg from '@utils/img/posting.jpg';
import styled from 'styled-components';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Category_data } from '@typings/type';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@store/config';

const SettingBaseImg = styled.div`
	background: url(${PostingImg});
	background-size: cover;
	width: 100vw;
	height: 200px;
	margin-bottom: 100px;
`;
const SettingBaseImgCover = styled.div`
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

const SettingNameContainter = styled.div`
	padding: 0 30px;
	max-width: 1110px;
	margin: 0 auto;
	width: 100%;
	min-height: 70vh;
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
	font-family: 'NanumGothicBold';
`;

const CategoryGroup = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2em;
`;

const MainCategoryGroup = styled.div``;

const Input = styled.input`
	margin-right: 2px;
`;

const MainCategory = styled.div`
	margin-right: 2px;
	cursor: pointer;
`;

const SubCategoryGroup = styled.div``;

const SubCategory = styled.div``;

const OnClickMainPlus = styled.button``;

const Setting = () => {
	// 토큰
	const token = useSelector((state: RootState) => state.token.token);

	// 토큰 설정
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	// 카테고리 초기 데이터 받기
	const { data, mutate, error } = useSWR<Category_data[]>('api/categorys', fetcher);

	// 메인 카테고리 생성 변수
	const [mainCategory, setMainCategory] = useState('');

	// 서브 카테고리 생성 변수
	const [subCategoryInput, setSubCategoryInput] = useState('');

	// 메인 카테고리 선택 변수
	const [mainCategoryPick, setMainCategoryPick] = useState('');

	// 서브 카테고리 선택 변수
	const [subCategoryPick, setSubCategoryPick] = useState('');

	//메인 카테고리 선택 시
	const onClickMainCategory = (e: any, Mc: any) => {
		e.preventDefault();
		setMainCategoryPick(Mc);
	};

	// 서브 카테고리 선택 시
	const onClickSubCategory = (e: any, Sc: any) => {
		e.preventDefault();
		setSubCategoryPick(Sc);
	};

	// 메인 카테고리 추가 시
	const handleMainPlus = (e: any) => {
		setMainCategory(e.target.value);
	};

	// 서브 카테고리 추가 시
	const handleSubPlus = (e: any) => {
		setSubCategoryInput(e.target.value);
	};

	// 메인 카테고리 삭제 시 sweetalert2 적용
	const onClickMainMinus = (e: any) => {
		e.preventDefault();
		Swal.fire({
			icon: 'warning',
			title: '해당 카테고리를 삭제하시겠습니까?',
			text: `${mainCategoryPick} 를 삭제합니다.`,
			showCancelButton: true,
			confirmButtonText: '삭제',
			cancelButtonText: '취소',
		}).then((res) => {
			if (res.isConfirmed) {
				axios
					.delete('/api/categorys/maincategory', {
						headers: { Authorization: `Bearer ${token}` },
						data: {
							category_name: mainCategoryPick,
						},
					})
					.then((response) => {
						mutate();
					})
					.catch((e) => {
						console.error(e);
					});
			} else {
				//취소
			}
		});
	};

	// 서브 카테고리 삭제 시 sweetalert2 적용
	const onClickSubMinus = (e: any) => {
		e.preventDefault();
		Swal.fire({
			icon: 'warning',
			title: '해당 카테고리를 삭제하시겠습니까?',
			text: `${subCategoryPick} 를 삭제합니다.`,
			showCancelButton: true,
			confirmButtonText: '삭제',
			cancelButtonText: '취소',
		}).then((res) => {
			if (res.isConfirmed) {
				axios
					.delete('/api/categorys/subcategory', {
						headers: { Authorization: `Bearer ${token}` },
						data: {
							category_name: subCategoryPick,
							main_category: mainCategoryPick,
						},
					})
					.then((response) => {
						mutate();
					})
					.catch((e) => {
						console.error(e);
					});
			} else {
				//취소
			}
		});
	};

	// 메인 카테고리 추가 시 sweetalert2 적용
	const onClickMainPlus = (e: any) => {
		e.preventDefault();
		Swal.fire({
			icon: 'warning',
			title: '해당 메인 카테고리를 추가하시겠습니까?',
			text: `${mainCategory} 를 추가합니다.`,
			showCancelButton: true,
			confirmButtonText: '추가',
			cancelButtonText: '취소',
		}).then((res) => {
			if (res.isConfirmed) {
				axios
					.post(
						'/api/categorys/maincategory',
						{
							category_name: mainCategory,
						},
						config
					)
					.then((response) => {
						mutate();
						Swal.fire('카테고리가 추가되었습니다.', '', 'success');
					})
					.catch((e) => {
						console.error(e);
					});
			} else {
				//취소
			}
		});
	};

	// 서브 카테고리 추가 시 sweetalert2 적용
	const onClickSubPlus = (e: any) => {
		e.preventDefault();
		Swal.fire({
			icon: 'warning',
			title: '해당 서브 카테고리를 추가하시겠습니까?',
			text: `${subCategoryInput} (을)를 추가합니다.`,
			showCancelButton: true,
			confirmButtonText: '추가',
			cancelButtonText: '취소',
		}).then((res) => {
			if (res.isConfirmed) {
				axios
					.post(
						'/api/categorys/subcategory',
						{
							category_name: subCategoryInput,
							main_category: mainCategoryPick,
						},
						config
					)
					.then((response) => {
						mutate();
						Swal.fire('카테고리가 추가되었습니다.', '', 'success');
					})
					.catch((e) => {
						console.error(e);
					});
			} else {
				//취소
			}
		});
	};

	return (
		<React.Fragment>
			<SettingBaseImg />
			<SettingBaseImgCover />

			<SettingNameContainter>
				<Content>
					<Text>
						<h2 style={{ display: 'inline-block', fontSize: 'inherit' }}>
							카테고리 수정
						</h2>
					</Text>
				</Content>

				<div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5em' }}>
					<CategoryGroup>
						<MainCategoryGroup>
							<div>
								<Input onChange={handleMainPlus} />
								<OnClickMainPlus onClick={onClickMainPlus}>+</OnClickMainPlus>
							</div>

							<div
								style={{
									display: 'grid',
									gridTemplateColumns: '80% 20%',
									rowGap: '2.5em',
									marginTop: '1.5em',
								}}
							>
								{data?.map((item) => (
									<>
										<MainCategory
											onClick={(e) =>
												onClickMainCategory(e, item.category_name)
											}
										>
											{item.category_name}
										</MainCategory>
										<button onClick={onClickMainMinus}>-</button>
									</>
								))}
							</div>
						</MainCategoryGroup>
						<div style={{ width: '3em' }}></div>
						<SubCategoryGroup>
							<div>
								<Input onChange={handleSubPlus} />
								<button onClick={onClickSubPlus}>+</button>
							</div>

							<div
								style={{
									display: 'grid',
									gridTemplateColumns: '80% 20%',
									rowGap: '2.5em',
									marginTop: '1.5em',
								}}
							>
								{data?.map((sub) =>
									sub.category_name === mainCategoryPick
										? sub.subCategorys.map((item) => (
												<>
													<SubCategory
														onClick={(e) =>
															onClickSubCategory(
																e,
																item.category_name
															)
														}
													>
														{item.category_name}
													</SubCategory>
													<button onClick={onClickSubMinus}>-</button>
												</>
										  ))
										: null
								)}
							</div>
						</SubCategoryGroup>
					</CategoryGroup>
				</div>
			</SettingNameContainter>
		</React.Fragment>
	);
};

export default Setting;