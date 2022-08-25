import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useState } from 'react';
import CategoryDetail from '@components/CategoryDetail';
import { Category_data } from '@typings/type';
import { motion } from 'framer-motion';

const CategoryWrapper = styled(motion.div)`
	width: 100vw;
	height: 100vh;
	background: rgba(255, 255, 255, 0.9);
	z-index: 98;
	position: fixed;
	transition: all 0.5s ease-out;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CategoryContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	gap: 5em;
`;

const CategoryModal = () => {
	const { data: categoryData, error } = useSWR('/api/categorys', fetcher);

	return (
		<>
			<CategoryWrapper
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.1 }}
			>
				<CategoryContainer>
					{categoryData?.map((data: Category_data) => (
						<CategoryDetail categoryData={data} key={data.id} />
					))}
				</CategoryContainer>
			</CategoryWrapper>
		</>
	);
};

export default CategoryModal;