import { Category_data } from '@typings/type';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SubCategoryModal from '@components/SubCategoryModal';
import { motion } from 'framer-motion';

interface ICategoryDetail {
	categoryData: Category_data;
}

const MainCategory = styled(motion.button)`
	background: inherit;
	border: none;
	box-shadow: none;
	border-radius: 0;
	padding: 0;
	overflow: visible;
	cursor: pointer;
	font-size: 1.5em;
	font-family: 'Bebas Neue', cursive;
	text-decoration-style: solid;
`;

const CategoryDetail = ({ categoryData }: ICategoryDetail) => {
	const sub_category = categoryData.subCategorys;

	const [open, setOpen] = useState(false);

	const onClickMain = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setOpen(true);
	};
	return (
		<>
			<MainCategory
				onClick={onClickMain}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1,  }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.1 }}
				whileHover={{ textDecorationLine:"underline" }}
			>
				{categoryData.category_name}
			</MainCategory>
			{open ? (
				<SubCategoryModal
					setOpen={setOpen}
					subCategory={sub_category}
					categoryData={categoryData}
				/>
			) : null}
		</>
	);
};

export default CategoryDetail;