export function formatDuration(seconds: number) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const pad = (n: number) => n.toString().padStart(2, '0')

  if (hrs > 0) return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`
  return `${pad(mins)}:${pad(secs)}`
}

export function getEvenTimestamps(duration: number, interval: number): number[] {
  if (interval <= 0 || duration <= 0) {
    return [];
  }

  const startOffset = duration * 0.05;
  const endOffset = duration * 0.95;
  const usableLength = endOffset - startOffset;
  const numIntervals = Math.floor(usableLength / interval);

  if (numIntervals === 0) {
    if (usableLength >= 1) {
      return [Math.floor(startOffset + usableLength / 2)];
    }

    return [0];
  }

  const timestamps: number[] = [];

  for (let i = 0; i <= numIntervals; i++) {
    const ts = startOffset + i * interval;
    if (ts >= endOffset) break;
    timestamps.push(Math.floor(ts));
  }

  return timestamps;
}