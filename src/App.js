import React, { Component } from 'react';
import Lister from './components/Lister/Lister';
import ErrorBlock from './components/ErrorBlock/ErrorBlock';

import { getMovies, getProgramInfo } from './lib/api';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {
				0: [{}, {}, {}],
				1: [{}, {}, {}]
			},
			error: {
				0: false,
				1: false
			},
			errorDescription: {
				0: 'Onbekende fout',
				1: 'Onbekende fout'
			}
		}
	}

	componentDidMount() {
		this.fetchDays([0, 1]);
		window.addEventListener('reloadData', event => this.fetchDays([event.detail.day]));
	}

	fetchDays(days) {
		days.forEach(day => {
			this.getData(day)
				.then(dayData => this.setState({ data: Object.assign({}, this.state.data, { [day]: dayData }), error: Object.assign({}, this.state.error, { [day]: false }) }))
				.catch(({ message }) => this.setState({ error: Object.assign({}, this.state.error, { [day]: true }), errorDescription: Object.assign({}, this.state.errorDescription, { [day]: message }) }));
		});
	}

	getData(day = 0) {
		return new Promise((resolve, reject) => {
			getMovies(day).then(data => {
				const itemsData = [];
				data.forEach(items => {
					items.forEach(item => {
						itemsData.push(item);
						itemsData.sort((a, b) => (a.ch_id - b.ch_id) || (a.s - b.s));
					});
				});

				return itemsData;
			})
			.then(itemsData => {
				itemsData.forEach(item => {
					getProgramInfo(item.db_id).then(({data}) => {
						item.img = data.img;
						item.rating = data.rating;
						item.year = data.year;
						item.prog_sort = data.prog_sort;
						item.dir = data.dir;
						item.act = data.act;
						item.country = data.country;
						item.scen = data.scen;
						item.comp = data.comp;
					});
				});
				resolve(itemsData);
			})
			.catch(error => reject(error));
		});
	}

	render() {
		return (
			<main>
				<section className="today">
					<h1>Films vandaag op televisie</h1>
					{ this.state.error[0] ? (
						<ErrorBlock description={ this.state.errorDescription[0] } day={0} />
					) : (
						<Lister data={ this.state.data[0] } day="Vandaag" />
					)}
				</section>
				<section className="tomorrow">
					<h2>Films morgen op televisie</h2>
					{ this.state.error[1] ? (
						<ErrorBlock description={ this.state.errorDescription[1] } day={1} />
					) : (
						<Lister data={ this.state.data[1] } day="Morgen" />
					)}
				</section>
			</main>
		);
	}
}

export default App;
