import React, { Component } from 'react';
import { getMovies, getProgramInfo } from '../../lib/api';
import formatTime from '../../lib/formatTime' ;
import config from '../../config';

class Lister extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itemData: [],
			programInfo: {}
		};

		getMovies()
			.then(itemData => this.setState({ itemData }))
			.then(() => {
				console.log(this.state.itemData);
				// getProgramInfo(this.state.itemData).then(resp => {
				// 	console.log(resp);
				// });
			})
	}
	render() {
		const listItems = this.state.itemData.map(movies => {
			return movies.map(movie => {
				return (
					<li key={ movie.db_id }>
						<img src={ config.api.channelLogoSrc.replace(/%s/g, movie.ch_id) } alt="" />
						<h2>{ formatTime(movie.s) } - { formatTime(movie.e) } { movie.t }</h2>
						{ this.state.programInfo[movie.db_id] }
					</li>
				)
			});
		});
		return (
			<ul className="lister">
				{ listItems }
			</ul>
		);
	}
}

export default Lister;