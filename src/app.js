// First core modules, second npm modules
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
// hbs are express integrated "handlebars"
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'me',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About the site',
		text: 'this is amazing',
		name: 'me',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: "Welcome to the  website's help page",
		title: 'help',
		name: 'me',
	});
});

app.get('/weather', (req, res) => {
	const { address } = req.query;

	if (!address) {
		return res.send({
			error: 'please provide an address',
		});
	} else {
		geocode(address, (error, { latitude, longitude, location } = {}) => {
			if (error) return res.send({ error });

			forecast(latitude, longitude, (error, forecast) => {
				if (error) return res.send({ error });

				res.send({
					search: address,
					location,
					forecast,
				});
			});
		});
	}
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'you must provide a search term',
		});
	}
	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Help article not found',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found',
		name: 'hrvoje',
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
