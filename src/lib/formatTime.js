export default function formatTime(timestamp) {
	const date = new Date(parseInt(timestamp, 10) * 1000);
	const hours = date.getHours();
	const minutes = '0' + date.getMinutes();
	return `${hours}:${minutes.substr(-2)}`;
}