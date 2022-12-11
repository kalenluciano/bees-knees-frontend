import { createWebHistory, createRouter } from 'vue-router';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import NewsFeed from './pages/NewsFeed';
import ProfilePage from './pages/ProfilePage';
import SignUp from './pages/SignUp';

const routes = [
	{ path: '/', component: NewsFeed, name: 'NewsFeed' },
	{ path: '/explore', component: ExplorePage, name: 'ExplorePage' },
	{ path: '/profile/:user_id', component: ProfilePage, name: 'ProfilePage' },
	{ path: '/login', component: LoginPage, name: 'LoginPage' },
	{ path: '/sign-up', component: SignUp, name: 'SignUp' }
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
