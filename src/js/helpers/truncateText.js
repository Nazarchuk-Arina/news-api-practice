export function truncate(text, symbolLimit = 90) {
  if (!text) {
    return text;
  }
  return text.length <= symbolLimit
    ? text
    : `${text.slice(0, symbolLimit - 3) + '...'}`;
}
