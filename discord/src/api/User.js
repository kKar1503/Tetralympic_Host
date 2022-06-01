/**
 * A user.
 * @prop {String} id
 * @prop {String} username
 * @prop {String} country
 * @prop {Number} tetraLeague.gamesPlayed
 * @prop {Number} tetraLeague.rating
 * @prop {Number} tetraLeague.glicko
 * @prop {Number} tetraLeague.rd
 * @prop {String} tetraLeague.rank
 * @prop {Number} tetraLeague.apm
 * @prop {Number} tetraLeague.pps
 * @prop {Number} tetraLeague.vs
 * @prop {String} joinDate
 */
export default class User {
	constructor(data) {
		this.id = data._id;
		this.username = data.username;
		this.country = data.country;
		if (data.league) {
			this.tetraLeague = {
				gamesPlayed: data.league.gamesplayed,
				rating: data.league.rating,
				glicko: data.league.glicko,
				rd: data.league.rd,
				rank: data.league.rank,
				apm: data.league.apm,
				pps: data.league.pps,
				vs: data.league.vs,
			};
		}
		this.joinDate = data.ts;

		Object.keys(this).forEach((key) => (this[key] === undefined ? delete this[key] : {}));
	}
}
