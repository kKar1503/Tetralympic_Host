/**
 * A Tetrio user.
 * @prop {String} id
 * @prop {String} username
 * @prop {String} country
 * @prop {Number} gamesPlayed
 * @prop {Number} rating
 * @prop {Number} glicko
 * @prop {Number} rd
 * @prop {String} rank
 * @prop {Number} apm
 * @prop {Number} pps
 * @prop {Number} vs
 * @prop {Date} joindate
 * @prop {String} highest_rank
 */
export default class TetrioUser {
	constructor(data, options = {}) {
		if (options.fromApi) {
			this.id = data._id;
		} else {
			this.id = data.id;
		}
		this.username = data.username.toLowerCase();
		this.country = data.country;
		if (options.fromApi) {
			if (data.league) {
				this.gamesplayed = data.league.gamesplayed;
				this.rating = data.league.rating;
				this.glicko = data.league.glicko;
				this.rd = data.league.rd;
				this.rank = data.league.rank;
				this.apm = data.league.apm;
				this.pps = data.league.pps;
				this.vs = data.league.vs;
				this.joindate = new Date(data.ts);
			}
		} else {
			this.gamesplayed = data.gamesplayed;
			this.rating = data.rating;
			this.glicko = data.glicko;
			this.rd = data.rd;
			this.rank = data.rank;
			this.apm = data.apm;
			this.pps = data.pps;
			this.vs = data.vs;
			this.joindate = new Date(data.joindate);
		}
		this.highest_rank = data.highest_rank;

		Object.keys(this).forEach((key) => (this[key] === undefined ? (this[key] = null) : {}));
	}
}
