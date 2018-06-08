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

		this.getData().then(dataToday => this.setState({ dataToday }));
		this.getData(1).then(dataTomorrow => this.setState({ dataTomorrow }));
	}

	getData(day = 0) {
		return new Promise((resolve, reject) => {
			const itemData = [];
			getMovies(day).then(data => {
				data.forEach(items => {
					items.forEach(item => {
						getProgramInfo(item.db_id).then(info => {
							item.descr = info.descr;
							item.img = info.img;
							itemData.push(item);

							// Sort by channel Id first then sort on start time
							itemData.sort((a, b) => (a.ch_id - b.ch_id) || (a.ch_id - b.ch_id) || (a.s - b.s) || (a.s - b.s));

							resolve(itemData);
						})
						.catch(err => reject(err));
					});
				});
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
