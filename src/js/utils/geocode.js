const request = require('request');
const { GEOCODE_API, GEOCODE_API_TOKEN } = require('../config');

const geocode = (address, callback) => {
	const url = `${GEOCODE_API}${encodeURIComponent(
		address
	)}.json?access_token=${GEOCODE_API_TOKEN}&limit=1`;

	request({ url, json: true }, (err, res) => {
		if (err) callback('Unable to connect to the weather services');
		if (res.body.features.length === 0)
			callback('Unable to find location. Try another search');
		const { center, place_name } = res.body.features[0];
		callback(undefined, {
			latitude: center[1],
			longitude: center[0],
			location: place_name,
		});
	});
};

module.exports = geocode;
