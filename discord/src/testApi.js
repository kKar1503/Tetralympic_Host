import { ThreadChannel } from "discord.js";
import { TetrioApi } from "./api/index.js";
import { TetrioUser } from "./models/index.js";
import _ from "lodash";

const api = new TetrioApi();

let users = await api.getMultipleUsers(["klyrrad", "blaarg", "kkar", "icly"]);
let clonedUsers = _.cloneDeep(users);

let connection = new TetrioUser({ useLogger: true, loggingLength: 60 });
let dbQueries = [];
for (let user in clonedUsers) {
	dbQueries.push(connection.InsertOneUser(clonedUsers[user]));
}

const res = await Promise.allSettled(dbQueries).catch((err) => {});
connection.EndConnection();

for (let r of res) {
	console.log(r.reason.code);
}
