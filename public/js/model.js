export const state = {
	developer: 'Hrvoje',
	search: {},
};

export const getWeather = async function (address) {
	try {
		const res = await fetch(`/weather?address=${address}`);

		if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

		const data = await res.json();
		console.log(data);
	} catch (err) {
		throw err;
	}
};
