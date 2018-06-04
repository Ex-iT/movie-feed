import React, { Component } from 'react';
import { getMovies, getProgramInfo } from '../../lib/api';
import formatTime from '../../lib/formatTime' ;
import config from '../../config';

class Lister extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itemData: [],
			toggleStatus : {}
		};

		getMovies().then(data => {
			data.forEach(itemArr => {
				const itemData = this.state.itemData;
				const item = itemArr[0];
				getProgramInfo(item.db_id).then(descr => {
					item.descr = descr.descr;
					itemData.push(item);
					this.setState({ itemData })
				});
			});
		});

		this.collapsable = this.collapsable.bind(this);
	}

	collapsable(id) {
		const data = Object.assign({}, this.state.toggleStatus, { [id]: this.state.toggleStatus[id] ? !this.state.toggleStatus[id] : true });
		this.setState({ toggleStatus: data });
	}

	render() {
		const listItems = this.state.itemData.map(movie => {
			return (
				<li key={ movie.db_id } className="movie-item">
					<div className="logo"><img src={ config.api.channelLogoSrc.replace(/%s/g, movie.ch_id) } alt="" /></div>
					<div className="movie-info" onClick={ this.collapsable.bind(this, movie.db_id) }>
						<div className="details">
							<h2>{ movie.t }</h2>
							{ formatTime(movie.s) } - { formatTime(movie.e) }
						</div>
						<div className={`assets-details ${this.state.toggleStatus[movie.db_id] ? 'open' : '' }`}>
							<div className="synopsis" dangerouslySetInnerHTML={{__html: movie.descr }}></div>
						</div>
					</div>
				</li>
			);
		});
		return (
			<ol>
				{ listItems }
			</ol>
		);
	}
}

export default Lister;