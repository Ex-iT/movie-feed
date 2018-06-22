import React, { Component } from 'react';
import Lister from './components/Lister/Lister';

import { getMovies, getProgramInfo } from './lib/api';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dataToday: [{}, {}, {}],
			dataTomorrow: [{}, {}, {}]
		}

		Promise.all([this.getData(), this.getData(1)]).then(([dataToday, dataTomorrow]) => {this.setState({ dataToday, dataTomorrow })});
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
					getProgramInfo(item.db_id).then(info => {
						item.descr = info.descr;
						item.img = info.img;
					});
				});
				resolve(itemsData);
			})
			.catch(err => reject(err));
		});
	}

	render() {
		return (
			<main>
				<section className="today">
					<h1>Films vandaag op televisie</h1>
					<Lister data={ this.state.dataToday } />
				</section>
				<section className="tomorrow">
					<h2>Films morgen op televisie</h2>
					<Lister data={ this.state.dataTomorrow } />
				</section>
			</main>
		);
	}
}

export default App;
