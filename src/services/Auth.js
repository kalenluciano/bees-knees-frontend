import Client from './api';

export const LoginUser = async (data) => {
	try {
		const res = await Client.post('/auth/login', data);
		localStorage.setItem('token', res.data.token);
		return res.data.user;
	} catch (error) {
		return 'error';
	}
};

export const SignUpUser = async (data) => {
	try {
		const res = await Client.post('/auth/register', data);
		return res.data;
	} catch (error) {
		return 'error';
	}
};

export const CheckSession = async () => {
	const res = await Client.get('/auth/session');
	return res.data;
};
