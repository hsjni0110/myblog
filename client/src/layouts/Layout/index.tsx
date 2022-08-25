import { useCallback, useState, useEffect } from 'react';
import Header from '@components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer';

const Layout = () => {
	const [sidebar, setSidebar] = useState(false)
	const toggleSidebar = useCallback(() => {
		setSidebar((prev) => !prev)
	},[sidebar])
	
	// 로그인 성공 여부
	const [loginSuccess, setLoginSuccess] = useState(false);
	
	const [isScroll, setIsScroll] = useState(false);
	
	useEffect(() => {
		window.addEventListener('scroll', () => {
			// 스크롤 시에 isScroll 변수 on
			window.pageYOffset > 0 ? setIsScroll(true) : setIsScroll(false);
		});
	}, [isScroll]);
	
	return (
		<>
			<Header loginSuccess={loginSuccess} toggleSidebar={toggleSidebar} isScroll={isScroll} setIsScroll={setIsScroll} />
		
			<Outlet />
			<Footer loginSuccess={loginSuccess} setLoginSuccess={setLoginSuccess}/>
		</>
	)
}

export default Layout;
