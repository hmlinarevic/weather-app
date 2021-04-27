const request = require('request');
const { WEATHERSTACK_API } = require('../config');

const forecast = (lat, lon, callback) => {
	const url = `${WEATHERSTACK_API}&query=${lat},${lon}`;

	request({ url, json: true }, (err, { body }) => {
		if (err) callback('Unable to connect to weather service!');
		if (body.error) callback('Unable to find location');
		else {
			const { temperature, weather_descriptions } = body.current;
			callback(
				undefined,
				`${temperature}℃  and ${weather_descriptions[0].toLowerCase()}. ${
					body.location.localtime
				}`
			);
		}
	});
};

module.exports = forecast;
