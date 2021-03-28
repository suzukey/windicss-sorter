export function isSameArray(arr1: Array<string>, arr2: Array<string>): boolean {
  if (arr1 === arr2) return true
  if (arr1.length != arr2.length) return false

  const a = arr1.slice().sort()
  const b = arr2.slice().sort()

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}
