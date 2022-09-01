import { Subcategory, Category_data } from '@typings/type';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ISubCategory {
	subCategory: Subcategory[];
	setOpen: (open: boolean) => void;
	categoryData: Category_data;
	setCategoryMenu: (categoryOpen:boolean) => void;
}

const SubCategoryWrapper = styled(motion.div)`
	width: 100vw;
	height: 100vh;
	background: rgba(255, 255, 255, 0.9);
	z-index: 99;
	position: fixed;
	transition: all 0.5s ease-out;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	left: 0;
	top: 0;
`;
const LinkContainter = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	gap: 2em;
	a {
		text-decoration: none;
		color: black;
	}
`;
const SubCategory = styled.div`
	font-family: 'Bebas Neue', cursive;
`;

const SubCategoryModal = ({ setCategoryMenu, subCategory, setOpen, categoryData }: ISubCategory) => {

	const onClickWrap = (e:any) => {
		e.preventDefault();
		setOpen(false);
	}
	return (
		<SubCategoryWrapper onClick={onClickWrap} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
			<LinkContainter>
				{subCategory.map((sub: Subcategory) => (
					<Link to={`categorys/${categoryData.category_name}/${sub.category_name}`}>
						<SubCategory>{sub.category_name}</SubCategory>
					</Link>
				))}
			</LinkContainter>
		</SubCategoryWrapper>
	);
};

export default SubCategoryModal;