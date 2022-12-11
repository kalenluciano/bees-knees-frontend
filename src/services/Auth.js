import Client from './api';

export const LoginUser = async (data) => {
	const res = await Client.post('/auth/login');
	localStorage.setItem('token', res.data.token);
	return res.data.user;
};

export const SignUpUser = async (data) => {
	const res = await Client.post('/auth/register');
	return res.data;
};

export const CheckSession = async () => {
	const res = await Client.get('/auth/session');
	return res.data;
};
