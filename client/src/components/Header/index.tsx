import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './styles';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import CategoryModal from '@components/CategoryModal';
interface Props {
	isScroll: boolean;
}
interface IHeader {
	toggleSidebar: () => void;
	isScroll: boolean;
	setIsScroll: (scrollValue: boolean) => void;
	loginSuccess: boolean;
}
const HeaderTypography = styled(Typography)`
	font-family: 'Bebas Neue', cursive;
	a {
		color: ${(props:Props) => props.isScroll? '#100F0F':'#f9f9f9'};
		text-decoration: none;
	}
`;
const HeaderAppBar = styled.div`
	background-color: #fff;
	color: rgba(0, 0, 0, 0.87);
	-webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
	width: 100%;
	box-sizing: border-box;
	-webkit-flex-shrink: 0;
	-ms-flex-negative: 0;
	flex-shrink: 0;
	position: static;
	background-color: ${(props:Props) => props.isScroll? '#F1F1F1':'transparent'};
	color: ${(props:Props) => props.isScroll? '#100F0F':'#FFF'};
	position: fixed;
	opacity: 1;
	-webkit-transition: all 0.2s ease-in-out;
	transition: all 0.2s ease-in-out;
	position: fixed;
	transition: all 0.2s ease-in-out;
	z-index: 100;
`;

const HeaderMenu = styled.div`
	font-family: 'Bebas Neue', cursive;
	flex-grow: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	
	a{
		text-decoration: none;
		font-size: 1.25rem;
		color: ${(props:Props) => props.isScroll? '#100F0F':'#FFF'};
		padding-right: 7px;
		padding-left: 7px;
	}
	button {
		text-decoration: none;
		font-size: 1.25rem;
		color: ${(props:Props) => props.isScroll? '#100F0F':'#FFF'};
		padding-right: 7px;
		padding-left: 7px;
		background: inherit ; 
		border:none; 
		box-shadow:none; 
		border-radius:0; 
		padding:0; 
		overflow:visible; 
		cursor:pointer;
		font-family: 'Bebas Neue', cursive;
	}
`;

const Header = ({ loginSuccess, toggleSidebar, isScroll, setIsScroll }: IHeader) => {
	
	const [categoryMenu, setCategoryMenu] = useState(false);
	
	const onClickCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setCategoryMenu((prev) => !prev);
	}
	return (
		<>
		<Box sx={{ flexGrow: 1, zIndex: 100 }}>
			<HeaderAppBar isScroll={isScroll}>
				<Toolbar>

					<HeaderTypography
						variant="h6"
						noWrap
						sx={{ display: { xs: 'none', sm: 'block' }, fontSize:"1.5rem", fontWeight:"700" }}
						isScroll={isScroll}
					>
						<Link to="/home">Devlog</Link>
					</HeaderTypography>
					
					<HeaderMenu isScroll={isScroll}>
						{loginSuccess? (<Link to="/board">Posting</Link>):null}
						{loginSuccess? (<Link to="/setting">Setting</Link>):null}
						<Link to="/home">Home</Link>
						<button onClick={onClickCategory}>Category</button>
					</HeaderMenu>
					
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
				</Toolbar>
			</HeaderAppBar>
		</Box>
		{categoryMenu? <CategoryModal /> : null}
		</>
	);
};

export default Header;