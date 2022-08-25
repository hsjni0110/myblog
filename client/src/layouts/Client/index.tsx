import { Routes, Route, Navigate } from 'react-router-dom';
import Loadable from '@loadable/component';
const Home = Loadable(() => import('@pages/Home'));
const Layout = Loadable(() => import('@layouts/Layout'));
const Board = Loadable(() => import('@pages/Board'));
const Posting = Loadable(() => import('@pages/Posting'));
const CategoryPage = Loadable(() => import('@pages/CategoryPage'));
const Setting = Loadable(() => import('@pages/Setting'));
const Editing = Loadable(() => import('@pages/Editing'));

const Client = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate replace to="/home" />} />
			<Route path="/" element={<Layout />}>
				<Route path='home' element={<Home />} />
				<Route path='board' element={<Board />} />
				<Route path='posting/:id' element={<Posting />} />
				<Route path='categorys/:main/:sub' element={<CategoryPage />} />
				<Route path='setting' element={<Setting />} />
				<Route path='editing/:id' element={<Editing />} />
			</Route>
		</Routes>
	);
};

export default Client;