import { defineStore } from 'pinia';
import { CheckSession } from '../services/Auth';

export const useUserStore = defineStore('UserStore', {
	state: () => {
		return {
			user: null,
			authenticated: false,
			tokenChecked: false
		};
	},
	actions: {
		async checkToken() {
			const user = await CheckSession();
			this.user = user;
			this.authenticated = true;
			this.tokenChecked = true;
		},
		setUser(user) {
			this.user = user;
		},
		setAuthenticated(state) {
			this.authenticated = state;
		}
	}
});
