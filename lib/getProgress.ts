export default function getProgress(now: number, start: number, end: number) {
  const progress = Math.round(((now - start) / (end - start)) * 100);
  return progress < 0 || progress >= 100 ? 0 : progress;
}
