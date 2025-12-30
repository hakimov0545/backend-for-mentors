import { log, readLogs } from "./logger.js";

log("APP STARTED");

setTimeout(() => {
	log("FIRST TIMEOUT EVENT");
}, 2000);

let count = 0;
const intervalId = setInterval(() => {
	count++;
	log("INTERVAL TICK");

	if (count >= 3) {
		clearInterval(intervalId);
	}
}, 1000);

setTimeout(() => {
	const logs = readLogs();

	console.log("\n======= LOGS =======");
	console.log(logs);
	console.log("====================\n");
}, 5000);
