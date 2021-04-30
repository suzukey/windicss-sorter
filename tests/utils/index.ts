import WindiSorter from '@/index'
import { Options } from '@/interfaces'

export function compareClasses(
  target: string,
  correct: string,
  options: Options
): void {
  const windiSorter = new WindiSorter(options)

  const sortedClassList = windiSorter.sortClassNames(target)

  expect(sortedClassList).toBe(correct)
}
