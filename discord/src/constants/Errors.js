export class RegistrationError extends Error {
	constructor(message) {
		super(message);
		this.name = "RegistrationError";
	}
}

export class DatabaseError extends Error {
	constructor(message) {
		super(message);
		this.name = "DatabaseError";
	}
}

export class RegistrationClosedError extends RegistrationError {
	constructor() {
		super("Registration closed.");
	}
}

export class OutOfCompetitionLimitError extends RegistrationError {
	constructor(limit, value, expected) {
		this.limit = limit;
		this.value = value;
		this.expected = expected;
		super(`Out of limit: ${this.limit} (value: ${this.value}, expected: ${this.expected})`);
	}
}

export class AlreadyBindedError extends DatabaseError {
	constructor(username, discordId) {
		this.username = username;
		this.discordId = discordId;
		super(`You have already binded with ${this.username}.`);
	}
}

export class BindedByOthersError extends DatabaseError {
	constructor(username, discordId) {
		this.username = username;
		this.discordId = discordId;
		super(`Someone has already binded with ${this.username}.`);
	}
}
