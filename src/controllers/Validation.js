import {
	Status,
	Ranks,
	RegistrationClosedError,
	OutOfCompetitionLimitError,
	UserUnrankedError,
	RegistrationNotOpenedError,
	TournamentIsOverError,
} from "../constants/index.js";

export function Validation(tetrioUser, competition, options = {}) {
	let userRank = options.validateByPeak ? tetrioUser : tetrioUser.rank;
	return new Promise((resolve, reject) => {
		if (competition.status != Status[2]) {
			if (competition.status == Status[1]) reject(new RegistrationNotOpenedError());
			if (competition.status == Status[7])
				reject(new TournamentIsOverError(competition.event_date));
			reject(new RegistrationClosedError(competition.registration_deadline));
		}
		if (competition.rd_limit != null && rankIndex(tetrioUser.rank) == -1) {
			reject(new UserUnrankedError());
		}

		if (competition.rd_limit != null && tetrioUser.rd > competition.rd_limit) {
			reject(new OutOfCompetitionLimitError("RD Limit", tetrioUser.rd, competition.rd_limit));
		}

		if (
			competition.rank_upper_limit != null &&
			rankIndex(userRank) > rankIndex(competition.rank_upper_limit)
		) {
			reject(
				new OutOfCompetitionLimitError(
					"Upper Limit",
					userRank,
					competition.rank_upper_limit
				)
			);
		}

		if (
			competition.rank_lower_limit != null &&
			rankIndex(userRank) < rankIndex(competition.rank_lower_limit)
		) {
			reject(
				new OutOfCompetitionLimitError(
					"Lower Limit",
					userRank,
					competition.rank_lower_limit
				)
			);
		}

		if (competition.country_limit != null && tetrioUser.country != competition.country_limit) {
			reject(
				new OutOfCompetitionLimitError(
					"Country Limit",
					tetrioUser.country,
					competition.country_limit
				)
			);
		}

		resolve();
	});
}

const rankIndex = (rank) => {
	return Ranks.indexOf(rank);
};
