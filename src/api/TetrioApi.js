import axios from "axios";
import { TetrioUserInterface, SnapshotInterface } from "../interface/index.js";
import { TetrioApi } from "./index.js";

export default class Api {
	/**
	 * Creates a new Tetr.io Api Object
	 */
	constructor() {
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

	async getMultipleUsers(users) {
		let apiCalls = [];

		for (let user of users) {
			apiCalls.push(this.apiCall("/users/" + user));
		}

		const res = await Promise.all(apiCalls);

		return new Promise((resolve, reject) => {
			const foundUsers = res.map((r) => {
				if (!r.success) reject(r.error);
				resolve(new TetrioUserInterface(r.data.user, { fromApi: true }));
			});

			const foundUsersObject = {};

			for (let i = 0; i < users.length; i++) {
				foundUsersObject[users[i]] = foundUsers[i];
			}

			resolve(foundUsersObject);
		});
	}

	getOneUser(user) {
		return new Promise(async (resolve, reject) => {
			let res;
			try {
				res = await this.apiCall("/users/" + user);
			} catch (e) {
				reject(e);
			}

			if (!res.success) {
				reject(new Error(res.error));
			}

			resolve(new TetrioUserInterface(res.data.user, { fromApi: true }));
		});
	}

	getPeakRank(id) {
		return new Promise(async (resolve, reject) => {
			let res;
			try {
				res = await this.apiCall("/news/user_" + id);
			} catch (e) {
				reject(e);
			}

			if (!res.success) {
				reject(new Error(res.error));
			}

			let peakRankObj = res.data.news.find((e) => e.type === "rankup");
			let peakRank = peakRankObj ? peakRankObj.data.rank : "z";

			resolve(peakRank);
		});
	}

	getSnapshot() {
		return new Promise(async (resolve, reject) => {
			let res;

			try {
				res = await this.apiCall("/users/lists/league/all");
			} catch (e) {
				reject(e);
			}

			let users = res.data.users;

			if (!res.success) {
				reject(new Error(res.error));
			}

			users = users.map((u) => {
				return new SnapshotInterface(u, new Date(res.cache.cached_at));
			});

			resolve({
				cached_at: res.cache.cached_at,
				users: users,
			});
		});
	}
}
