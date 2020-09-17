const request = require('request-promise');

const api_url = 'https://api.mojang.com';

function apiRequest(url, focus) {
	return new Promise((resolve, reject) => {
		const URL = (url.includes('https')) ? url : api_url + url;
		request({
			url: URL,
			json: true,
		}).then(res => {
			if (focus) {
				if (!res.hasOwnProperty(focus)) {
					reject(`MojangJS Error: Response doesn't have the property of ${focus}`);
				} else {
					resolve(res[focus]);
				}
			} else {
				resolve(res);
			}
		}).catch(err => {
			reject(`MojangJS Error: ${err.toString()}`);
		});
	});
}

module.exports = {
	getUUID: (username) => apiRequest(`/users/profiles/minecraft/${username}?at=${Math.round((new Date().getTime()) / 1000)}`, 'id'),

	nameHistory: {
		//   GET https://api.mojang.com/user/profiles/<uuid>/names
		byUUID: (uuid) => apiRequest(`/user/profiles/${uuid}/names`, null),
		byName: (username) => module.exports.getUUID(username).then(uuid => apiRequest(`/user/profiles/${uuid.toString()}/names`, null)),
	},

	statusCheck: () => apiRequest('https://status.mojang.com/check', null),
	getNameFromUUID: (uuid) => apiRequest(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid.replace(/-/g, '')}`, 'name'),
};

