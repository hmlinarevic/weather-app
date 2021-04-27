console.log('Client side javascript file is loaded!');

document.querySelector('form').addEventListener('submit', e => {
	e.preventDefault();

	const input = e.target.firstElementChild.value;
	e.target.firstElementChild.value = '';

	document.getElementById('form__output').textContent = 'Loading...';

	fetch(`http://localhost:3000/weather?address=${input}`).then(response =>
		response.json().then(data => {
			console.log(data);
			if (data.error)
				document.getElementById('form__output').textContent = data.error;
			else {
				document.getElementById(
					'form__output'
				).textContent = `${data.location} ${data.forecast}`;
			}
		})
	);
});
