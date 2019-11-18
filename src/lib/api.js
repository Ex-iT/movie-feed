import config from '../config';

function getMovies(day = 0) {
	return new Promise((resolve, reject) => {
		fetch(config.api.programsUrl.replace(/%s/g, day))
			.then(resp => resp.json())
			.then(json => resolve(_filterChannels(json.data)))
			.catch(error => reject(error));
	});
}

function _filterChannels(channels) {
	const channelData = channels.filter(channel => config.channels.indexOf(parseInt(channel.ch_id, 10)) !== -1);
	return _filterMovies(channelData);
}

function _filterMovies(channelData) {
	return channelData.map(channel => channel.prog.filter(prog => {
		prog.ch_id = channel.ch_id;
		return parseInt(prog.g_id, 10) === config.genre_id;
	}))
		.filter(item => item.length);
}

function getProgramInfo(db_id) {
	return new Promise((resolve, reject) => {
		fetch(config.api.programUrl.replace(/%s/g, db_id))
			.then(resp => resp.json())
			.then(json => resolve({ db_id, data: json.data }))
			.catch(error => reject(error));
	});
}

export { getMovies, getProgramInfo };
