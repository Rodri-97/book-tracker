export function generateArrayInRange(start: number, end: number): number[] {
  const result: number[] = [];

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}

export function getSearchResultsUrl(
  title: string | undefined,
  author: string | undefined,
  page: number
): string {
  return `/search-results?title=${title}&author=${author}&page=${page}`;
}

export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
