import { createWebHistory, createRouter } from 'vue-router';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import NewsFeed from './pages/NewsFeed';
import ProfilePage from './pages/ProfilePage';
import SignUp from './pages/SignUp';
import PostDetails from './pages/PostDetails';
import CommentPage from './pages/CommentPage';
import RepostPage from './pages/RepostPage';

const routes = [
	{ path: '/', component: NewsFeed, name: 'NewsFeed' },
	{ path: '/explore', component: ExplorePage, name: 'ExplorePage' },
	{ path: '/profile/:user_id', component: ProfilePage, name: 'ProfilePage' },
	{ path: '/login', component: LoginPage, name: 'LoginPage' },
	{ path: '/sign-up', component: SignUp, name: 'SignUp' },
	{ path: '/post/:post_id', component: PostDetails, name: 'PostDetails' },
	{ path: '/comment/:post_id', component: CommentPage, name: 'CommentPage' },
	{ path: '/repost/:post_id', component: RepostPage, name: 'RepostPage' }
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
