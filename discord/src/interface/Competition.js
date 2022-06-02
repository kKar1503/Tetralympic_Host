/**
 * A Competition.
 * @prop {Number} id
 * @prop {String} name
 * @prop {Date} event_date
 * @prop {String} rank_upper_limit
 * @prop {String} rank_lower_limit
 * @prop {Number} rd_limit
 * @prop {String} country_limit
 * @prop {String} status
 * @prop {Date} registration_deadline
 */
export default class Competion {
	constructor(data) {
		this.id = data.id;
		this.name = data.name;
		this.event_date = data.event_date;
		this.rank_upper_limit = data.rank_upper_limit;
		this.rank_lower_limit = data.rank_lower_limit;
		this.rd_limit = data.rd_limit;
		this.country_limit = data.country_limit;
		this.status = data.status;
		this.registration_deadline = data.registration_deadline;

		Object.keys(this).forEach((key) => (this[key] === undefined ? (this[key] = null) : {}));
	}
}
