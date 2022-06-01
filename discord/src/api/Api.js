import axios from "axios";
import User from "./User.js";

export default class Api {
	/**
	 * Creates a new Tetr.io Api Object
	 * @param {String} token Tetr.io User Token
	 * @param {Boolean} [options.notFoundAsError=true] Throws error when user is not found instead of returning nothing.
	 */
	constructor(token, options = {}) {
		this.token = token;
		this.baseUrl = "https://tetr.io/api";
		this.notFoundAsError =
			options.notFoundAsError === undefined ? true : !!options.notFoundAsError;
	}

	get config() {
		return {
			notFoundAsError: this.notFoundAsError,
		};
	}

	get header() {
		return {
			headers: { Authorization: "Bearer " + this.token },
		};
	}

	async apiCall(endpoint) {
		if (!this.token) throw new Error("No Token Found");

		try {
			const res = await axios.get(this.baseUrl + endpoint, this.header);

			return res.data;
		} catch (error) {
			throw new Error(error.response.data.errors[0].msg || error);
		}
	}

	/**
	 * Returns a not found error or the response, depending on the config
	 * @param {Object} response
	 * @returns {Object}
	 */
	notFound(response) {
		if (this.notFoundAsError) throw new Error("Not found");

		return response;
	}

	async getMultipleUsers(options) {
		let users = options.users;
		let apiCalls = [];

		for (let user in users) {
			apiCalls.push(this.apiCall("/users/" + user));
		}

		Promise.all(apiCalls)
			.then((res) => {
				return Promise.all(res.map((r) => new User(r.user)));
			})
			.then((users) => {
				return users;
			});
	}

	async getOneUser(options) {
		let user = options.user;

		const res = await this.apiCall("/users/" + user);

		if (res.length === 0) return this.notFound(res);

		return new User(res.user);
	}
}
