import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Modal = styled.div`
	display: flex;
	min-width: 300px;
	height: 300px;
	background: #f1f1f1;
	z-index: 3;
	justify-content: center;
	align-items: center;
`;

export const ModalWrap = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.2);
	justify-content: center;
	align-items: center;
	cursor: pointer;
	z-index: 100;
`;