import { TetrioApi } from "./api/index.js";

const api = new TetrioApi();

console.log(
	await api.getMultipleUsers({ users: ["tourney_org", "kkar", "skyllabtw", "whoamashjfgak"] })
);
