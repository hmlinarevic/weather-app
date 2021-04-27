class SearchView {
	#parentEl = document.querySelector('form');

	#clear() {
		this.#parentEl.querySelector('input').innerHTML = '';
	}

	addHandler(handler) {
		this.#parentEl.addEventListener('submit', e => {
			e.preventDefault();
			const inputValue = this.#parentEl.querySelector('input').value;
			this.#clear();
			handler(inputValue);
		});
	}
}

export default new SearchView();
