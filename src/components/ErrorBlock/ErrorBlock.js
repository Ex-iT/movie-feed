import React, { Component } from 'react';

class ErrorBlock extends Component {
	constructor(props) {
		super(props);

		this.state = {
			day: typeof props.day === 'number' ? props.day : null,
			description: props.description || '',
			isLoading: false
		};

		this.reload = this.reload.bind(this);
	}

	componentWillReceiveProps() {
		this.setState({ isLoading: false });
	}

	reload() {
		this.setState({ isLoading: true });

		if (typeof this.state.day === 'number') {
			window.dispatchEvent(new CustomEvent('reloadData', { detail: { day: this.state.day } }));
		} else {
			window.location.reload(true);
		}
	}

	render() {
		return (
			<button className="error-block" onClick={ this.reload } disabled={ this.state.isLoading }>
				<span className="description">Er is een fout opgetreden: <i>"{ this.state.description }"</i></span>
				<span className={ 'icon-reload' + (this.state.isLoading ? ' spin' : '') }><span className="a11y-only">Herladen</span></span>
			</button>
		);
	}
}

export default ErrorBlock;