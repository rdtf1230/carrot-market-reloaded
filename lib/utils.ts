export function formatToWon(price: number): string {
  return price.toLocaleString('ko-KR');
}

export function formatToTimeAgo(data: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;

  const time = new Date(data).getTime();
  const now = new Date().getTime();

  const diff = Math.round((time - now) / dayInMs);

  const formattter = new Intl.RelativeTimeFormat('ko');

  return formattter.format(diff, 'days');
}
