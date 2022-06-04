import { TetrioApi } from "./api/index.js";
import { TetrioUser, DiscordUser, Competition } from "./models/index.js";
import _ from "lodash";

// const api = new TetrioApi();

// let users = await api.getMultipleUsers(["flashm8", "tourney_org", "kkar", "icly"]);
// let clonedUsers = _.cloneDeep(users);

// let connection = new TetrioUser({ useLogger: true, loggingLength: 60 });
// let dbQueries = [];
// for (let user in clonedUsers) {
// 	dbQueries.push(connection.InsertOneUser(clonedUsers[user]));
// }

// await Promise.allSettled(dbQueries).catch((err) => {});

// const res = await connection.GetUsers();

// connection.EndConnection();

// let discord = new DiscordUser({ useLogger: true, loggingLength: 60 });
// discord.EndConnection();

let comp = new Competition({ useLogger: true, loggingLength: 60 });
let comp1 = await comp.GetCompetitionById(1);
console.log(comp1);
comp.EndConnection();
