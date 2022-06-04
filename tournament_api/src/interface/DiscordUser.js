/**
 * A Discord user.
 * @prop {Number} id
 * @prop {String} username
 * @prop {String} discriminator
 * @prop {String} fk_tetrio_id
 */
export default class DiscordUser {
	constructor(data, tetrio_id) {
		this.id = data.id;
		this.username = data.username;
		this.discriminator = data.discriminator;
		this.fk_tetrio_id = tetrio_id;

		Object.keys(this).forEach((key) => (this[key] === undefined ? (this[key] = null) : {}));
	}
}
