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
	constructor(deadline, status) {
		super(`Registration closed, event current status: ${status} (Deadline: ${deadline})`);
		this.deadline = deadline;
		this.status = status;
	}
}

export class RegistrationNotOpenedError extends RegistrationError {
	constructor() {
		super("Registration not opened.");
	}
}

export class TournamentIsOverError extends RegistrationError {
	constructor(eventDate) {
		super(
			`Unless you have a time machine, but the event was long over, buddy! (Event Date: ${eventDate})`
		);
		this.eventDate = eventDate;
	}
}

export class UserUnrankedError extends RegistrationError {
	constructor() {
		super("User is unranked.");
	}
}

export class OutOfCompetitionLimitError extends RegistrationError {
	constructor(limit, value, expected) {
		super(`Out of limit: ${limit} (value: ${value}, expected: ${expected})`);
		this.limit = limit;
		this.value = value;
		this.expected = expected;
	}
}

export class AlreadyBindedError extends DatabaseError {
	constructor(username, discordId) {
		super(`You have already binded with ${username}.`);
		this.username = username;
		this.discordId = discordId;
	}
}

export class BindedByOthersError extends DatabaseError {
	constructor(username, discordId) {
		super(`Someone has already binded with ${username}.`);
		this.username = username;
		this.discordId = discordId;
	}
}
