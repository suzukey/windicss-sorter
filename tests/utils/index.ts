import WindiSorter from '@/index'
import { Options } from '@/interfaces'

export async function compareClasses(
  target: string,
  correct: string,
  options: Options
): Promise<void> {
  const windiSorter = await WindiSorter.init(options)

  const sortedClassList = windiSorter.sortClassNames(target)

  expect(sortedClassList).toBe(correct)
}
