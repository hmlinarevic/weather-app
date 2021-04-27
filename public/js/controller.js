import * as model from './model.js';
import searchView from './views/searchView.js';

const controlSearch = async function (address) {
	try {
		await model.getWeather(address);
		console.log(searchView);
	} catch (err) {
		console.log(err);
	}
};

searchView.addHandler(controlSearch);
