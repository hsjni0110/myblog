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
}

const SubCategoryWrapper = styled(motion.div)`
	width: 30vw;
	height: 30vh;
	background: #f1f1f1;
	z-index: 99;
	position: fixed;
	transition: all 0.5s ease-out;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	left: 0;
	right: 0;
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

const SubCategoryModal = ({ subCategory, setOpen, categoryData }: ISubCategory) => {
	const onClickExit = (e: any) => {
		e.preventDefault();
		setOpen(false);
	};

	return (
		<SubCategoryWrapper initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.1 }}>
			<ClearIcon
				style={{ position: 'absolute', top: '1em', right: '1em',cursor:"pointer" }}
				onClick={onClickExit}
			/>
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