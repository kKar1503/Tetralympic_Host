import { Validation } from "../controllers/index.js";
import { TetrioApi } from "../api/index.js";

let testSubject1 = "jovangq";
let testSubject2 = "flashm8";
let testSubject3 = "liak";
let testSubject4 = "czsmall0402";
let testSubject5 = "skyllabtw";
let testResponse = [];

for (let i = 1; i < 11; i++) {
	Validation(await new TetrioApi().getOneUser(testSubject3), i)
		.then((c) => (testResponse[i - 1] = `Joined ${i}`))
		.catch((e) => (testResponse[i - 1] = `Failed ${i}\n${e.message}`));
}

setTimeout(() => {
	for (let j = 0; j < testResponse.length; j++) {
		console.log(testResponse[j]);
	}
}, 5000);
