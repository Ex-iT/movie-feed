export default function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString('nl-NL', {
    weekday: 'long',
    timeZone: 'Europe/Amsterdam',
  });
}
