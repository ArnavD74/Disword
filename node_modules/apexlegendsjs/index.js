const apexAPIURL = "public-api.tracker.gg";
const https = require("https");

function apexjs(code) {
	const apiKey = code;

	function getPlayer(username, platform) {
		checkInput([
			{ name: "Username", type: "string", value: username },
			{ name: "Platform", type: "string", value: platform }
		]);
		return connectToAPI(username, platform, apiKey).then((data) => {
			let character = {};
			character.level = data.metadata.level;
			character.legend_name = data.children[0].metadata.legend_name;
			character.platformUserHandle = data.metadata.platformUserHandle;
			return character;
		});
	}
	function getDetailedPlayer(username, platform) {
		checkInput([
			{ name: "Username", type: "string", value: username },
			{ name: "Platform", type: "string", value: platform }
		]);
		return connectToAPI(username, platform, apiKey)

	}
	return { getPlayer, getDetailedPlayer };
}
function getURL(username, platform) {
	switch (platform) {
		case "PC":
			return formatURL("5", username)
		case "XBOX":
			return formatURL("1", username)
		case "PSN":
			return formatURL("2", username)
		default:
			throw new Error("Platform must be PC, XBOX, or PSN");

	}
}
function formatURL(number, username) {
	return "/apex/v1/standard/profile/" + number + "/" + username;
}
function connectToAPI(username, platform, apiKey) {
	let url = getURL(username, platform);

	return new Promise((resolve, reject) => {

		const options = {
			host: apexAPIURL,
			port: 443,
			method: "GET",
			path: url,
			headers: {
				"Content-Type": "application/json",
				"TRN-Api-Key": apiKey
			}
		};
		const req = https.request(options, res => {
			let body = "";
			res.on("data", function (chunk) {
				body += chunk;
			});
			res.on("end", () => {
				body = JSON.parse(body);
				resolve(body.data)
			});
		});
		req.on("error", error => {
			console.error(error);
			reject(error)
		});
		req.end();
	})

}
function checkInput(inputs) {
	for (const input of inputs) {
		if (typeof input.value !== input.type)
			throw TypeError(input.name + " must be a " + input.type);
	}
}
module.exports = apexjs;
