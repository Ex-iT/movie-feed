import React, { Component } from 'react';
import formatTime from '../../lib/formatTime' ;
import config from '../../config';

class Lister extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itemData: props.data || [{}],
			toggleStatus: {}
		};

		this.collapsable = this.collapsable.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ itemData: nextProps.data });
	}

	collapsable(id) {
		const data = Object.assign({}, this.state.toggleStatus, { [id]: this.state.toggleStatus[id] ? !this.state.toggleStatus[id] : true });
		this.setState({ toggleStatus: data });
	}

	render() {
		const listItems = this.state.itemData.map((movie, index) => {
			return (
				<li key={ index } className="movie-item">
					<div className="logo"><img src={ movie.ch_id ? config.api.channelLogoSrc.replace(/%s/g, movie.ch_id) : '' } alt="" /></div>
					<div className="movie-info" onClick={ this.collapsable.bind(this, movie.db_id) }>
						<div className="details">
							<h3>{ movie.t }</h3>
							{ movie.s ? `${formatTime(movie.s)} - ${formatTime(movie.e)}` : '' }
						</div>
						<div className={`assets-details ${this.state.toggleStatus[movie.db_id] ? 'open' : '' }`}>
							{ movie.img &&
								<div className="asset-image"><img src={ `${config.api.assetsUrl}${movie.img}` } alt={ movie.t } /></div>
							}
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