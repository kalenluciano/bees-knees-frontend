import Client from './api';

export const LoginUser = async (data) => {
	try {
		const res = await Client.post('/auth/login');
		localStorage.setItem('token', res.data.token);
		return res.data.user;
	} catch (error) {
		throw error;
	}
};

export const SignUpUser = async (data) => {
	try {
		const res = await Client.post('/auth/register');
		return res.data;
	} catch (error) {
		throw error;
	}
};

export const CheckSession = async () => {
	try {
		const res = await Client.get('/auth/session');
		return res.data;
	} catch (error) {
		throw error;
	}
};
