export function generateArrayInRange(start: number, end: number): number[] {
  const result: number[] = [];

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}

export function findMostFrequentElements(
  arr: string[],
  x: number
): [string, number][] {
  const frequencyMap: Map<string, number> = new Map();

  for (const element of arr) {
    if (frequencyMap.has(element)) {
      frequencyMap.set(element, frequencyMap.get(element)! + 1);
    } else {
      frequencyMap.set(element, 1);
    }
  }

  const sortedElements = Array.from(frequencyMap.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  return sortedElements.slice(0, x);
}
