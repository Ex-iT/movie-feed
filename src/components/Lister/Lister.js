import React, { Component } from 'react';

class Lister extends Component {
	constructor(props) {
		super(props);

		this.config = {
			channelLogoSrc: 'http://tvgidsassets.nl/img/channels/140x140/%s.png',
			programsUrl: 'http://json.tvgids.nl/v3/programs/?day=0',
			programUrl: 'http://json.tvgids.nl/v3/program/%s/',
			channels: [1, 2, 3, 4, 31, 46, 92, 36, 460, 37, 34, 91, 7, 8, 440],
			genre_id: 6
		}

		this.state = {
			itemData: [],
			programInfo: {}
		};

		// @TODO: Get fetch URL from config
		fetch(this.config.programsUrl)
			.then(resp => resp.json())
			.then(json => this.filterChannels(json.data));
	}
	filterChannels(channels) {
		const channelData = channels.filter(channel => this.config.channels.indexOf(parseInt(channel.ch_id, 10)) !== -1);
		this.filterMovies(channelData);
	}
	filterMovies(channelData) {
		const itemData = channelData.map(channel => channel.prog.filter(prog => {
			prog.ch_id = channel.ch_id;
			return parseInt(prog.g_id, 10) === this.config.genre_id;
		}))
			.filter(item => item.length);
		this.setState({ itemData });
	}
	getProgramInfo(db_id) {
		console.log(db_id);
		return;
		fetch(this.config.programUrl.replace(/%s/g, db_id))
			.then(resp => resp.json())
			.then(json => {
				const programInfo = {
					db_id,
					descr: json.data.descr
				};
				this.setState({ programInfo });
			});
	}
	formatTime(timestamp) {
		const date = new Date(parseInt(timestamp, 10) * 1000);
		const hours = date.getHours();
		const minutes = '0' + date.getMinutes();
		return `${hours}:${minutes.substr(-2)}`;
	}
	render() {
		this.getProgramInfo(this.state.itemData);
		const listItems = this.state.itemData.map(movies => {
			return movies.map(movie => {
				return (
					<li key={ movie.db_id }>
						<img src={ this.config.channelLogoSrc.replace(/%s/g, movie.ch_id) } alt="" />
						<h2>{ this.formatTime(movie.s) } - { this.formatTime(movie.e) } { movie.t }</h2>
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