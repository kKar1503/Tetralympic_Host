/**
 * A Discord user.
 * @prop {String} id
 * @prop {String} username
 * @prop {String} discriminator
 * @prop {String} fk_tetrio_id
 */
export default class DiscordUser {
	constructor(data, options = {}) {
		this.id = data.id;
		this.username = data.username;
		this.discriminator = data.discriminator;
		this.fk_tetrio_id = options.tetrio_id || data.fk_tetrio_id;
		if (options.showTetrioUsername) this.tetrioUsername = data.tetrioUsername;

		Object.keys(this).forEach((key) => (this[key] === undefined ? (this[key] = null) : {}));
	}
}
