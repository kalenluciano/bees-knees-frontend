import { createWebHistory, createRouter } from 'vue-router';
import Explore from './pages/Explore';
import Login from './pages/Login';
import NewsFeed from './pages/NewsFeed';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

const routes = [
	{ path: '/', component: NewsFeed, name: 'NewsFeed' },
	{ path: '/explore', component: Explore, name: 'Explore' },
	{ path: '/profile/:user_id', component: Profile, name: 'Profile' },
	{ path: '/login', component: Login, name: 'Login' },
	{ path: '/sign-up', component: SignUp, name: 'SignUp' }
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
