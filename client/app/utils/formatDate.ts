export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-EN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}