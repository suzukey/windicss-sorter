import WindiSorter from '@/index'

describe('Simple Sort', () => {
  const windiSorter = new WindiSorter({})

  it('Sort TailwindCSS syntax', () => {
    const classes =
      'z-50 z-10 container text-left md:text-center justify-center'
    const correctClasses =
      'container justify-center text-left z-10 z-50 md:text-center'

    const sortedClassList = windiSorter.sortClassNames(classes)

    expect(sortedClassList).toBe(correctClasses)
  })

  it('Sort WindiCSS syntax', () => {
    const classes = 'bg-white sm:hover:(font-medium bg-gray-100) font-light'
    const correctClasses =
      'bg-white font-light sm:hover:(bg-gray-100 font-medium)'

    const sortedClassList = windiSorter.sortClassNames(classes)

    expect(sortedClassList).toBe(correctClasses)
  })
})

describe('Unknown Sort', () => {
  const windiSorter = new WindiSorter()

  it('Sort TailwindCSS syntax', () => {
    const classes =
      'z-50 z-10 container text-left md:text-center justify-center test md:test'
    const correctClasses =
      'container justify-center text-left z-10 z-50 md:text-center test md:test'

    const sortedClassList = windiSorter.sortClassNames(classes)

    expect(sortedClassList).toBe(correctClasses)
  })

  it('Sort WindiCSS syntax', () => {
    const classes =
      'bg-white sm:hover:(font-medium bg-gray-100 test) font-light test test:(test text-bold)'
    const correctClasses =
      'bg-white font-light sm:hover:(bg-gray-100 font-medium) test sm:hover:(test) test:(test text-bold)'

    const sortedClassList = windiSorter.sortClassNames(classes)

    expect(sortedClassList).toBe(correctClasses)
  })
})
