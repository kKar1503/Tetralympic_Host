import {
	Status,
	Ranks,
	RegistrationClosedError,
	OutOfCompetitionLimitError,
	UserUnrankedError,
	RegistrationNotOpenedError,
	TournamentIsOverError,
} from "../constants/index.js";
import { Competition } from "../models/index.js";

export async function Validation(tetrioUser, competitionId, options = {}) {
	let competition = new Competition();
	let matchingCompetition = await competition.GetCompetitionById(competitionId);
	competition.EndConnection();
	let userRank = options.validateByPeak ? tetrioUser : tetrioUser.rank;
	return new Promise((resolve, reject) => {
		if (matchingCompetition.status != 2) {
			if (matchingCompetition.status == 1) reject(new RegistrationNotOpenedError());
			if (matchingCompetition.status == 7)
				reject(new TournamentIsOverError(matchingCompetition.event_date));
			reject(new RegistrationClosedError(matchingCompetition.registration_deadline));
		}

		if (matchingCompetition.rd_limit != null && rankIndex(tetrioUser.rank) == -1) {
			reject(new UserUnrankedError());
		}

		if (matchingCompetition.rd_limit != null && tetrioUser.rd > matchingCompetition.rd_limit) {
			reject(
				new OutOfCompetitionLimitError(
					"RD Limit",
					tetrioUser.rd,
					matchingCompetition.rd_limit
				)
			);
		}

		if (
			matchingCompetition.rank_upper_limit != null &&
			rankIndex(userRank) > rankIndex(matchingCompetition.rank_upper_limit)
		) {
			reject(
				new OutOfCompetitionLimitError(
					"Upper Limit",
					userRank,
					matchingCompetition.rank_upper_limit
				)
			);
		}

		if (
			matchingCompetition.rank_lower_limit != null &&
			rankIndex(userRank) < rankIndex(matchingCompetition.rank_lower_limit)
		) {
			reject(
				new OutOfCompetitionLimitError(
					"Lower Limit",
					userRank,
					matchingCompetition.rank_lower_limit
				)
			);
		}

		if (
			matchingCompetition.country_limit != null &&
			tetrioUser.country != matchingCompetition.country_limit
		) {
			reject(
				new OutOfCompetitionLimitError(
					"Country Limit",
					tetrioUser.country,
					matchingCompetition.country_limit
				)
			);
		}

		resolve();
	});
}

const rankIndex = (rank) => {
	return Ranks.indexOf(rank);
};
