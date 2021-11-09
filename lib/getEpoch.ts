export default function getEpoch() {
  return Math.round(new Date().getTime() / 1000);
}
