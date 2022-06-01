import axios from "axios";
import User from "./User.js";

export default class Api {
	/**
	 * Creates a new Tetr.io Api Object
	 */
	constructor(options = {}) {
		this.baseUrl = "https://ch.tetr.io/api";
	}

	get config() {
		return {
			baseUrl: this.baseUrl,
		};
	}

	async apiCall(endpoint) {
		try {
			const res = await axios.get(this.baseUrl + endpoint);
			return res.data;
		} catch (error) {
			throw new Error(error.response.data.errors[0].msg || error);
		}
	}

	async getMultipleUsers(options) {
		let users = options.users;
		let apiCalls = [];

		for (let user of users) {
			apiCalls.push(this.apiCall("/users/" + user));
		}

		const res = await Promise.all(apiCalls);

		const foundUsers = res.map((r) => {
			if (!r.success) return r.error;
			return new User(r.data.user);
		});

		const foundUsersObject = {};

		for (let i = 0; i < users.length; i++) {
			foundUsersObject[users[i]] = foundUsers[i];
		}

		return foundUsersObject;
	}

	async getOneUser(options) {
		let user = options.user;

		const res = await this.apiCall("/users/" + user);

		if (!res.success) {
			return new Error(res.error);
		}

		return new User(res.data.user);
	}
}
