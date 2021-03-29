import WindiSorter from '@/index'

describe('Simple Sort', () => {
  it('Without group syntax', () => {
    const windiSorter = new WindiSorter({ useVariantGroup: false })

    const classes =
      'z-50 z-10 container text-left md:text-center justify-center'
    const correct =
      'container justify-center text-left z-10 z-50 md:text-center'

    const sortedClassList = windiSorter.sortClassNames(classes)

    expect(sortedClassList).toBe(correct)
  })

  it('With group syntax', () => {
    const windiSorter = new WindiSorter({ useVariantGroup: true })

    const classes = 'bg-white sm:hover:(font-medium bg-gray-100) font-light'
    const correct = 'bg-white font-light sm:hover:(bg-gray-100 font-medium)'

    const sortedClassList = windiSorter.sortClassNames(classes)

    expect(sortedClassList).toBe(correct)
  })
})

describe('Unknown Sort', () => {
  it('Without group syntax', () => {
    const windiSorter = new WindiSorter({ useVariantGroup: false })

    const classes =
      'z-50 test z-10 container text-left md:text-center md:test justify-center'
    const correct =
      'container justify-center text-left z-10 z-50 md:text-center test md:test'

    const sortedClassList = windiSorter.sortClassNames(classes)

    expect(sortedClassList).toBe(correct)
  })

  it('With group syntax', () => {
    const windiSorter = new WindiSorter({ useVariantGroup: true })

    const classes =
      'bg-white sm:hover:(font-medium bg-gray-100 test) font-light test test:(test text-bold)'
    const correct =
      'bg-white font-light sm:hover:(bg-gray-100 font-medium) test sm:hover:(test) test:(test text-bold)'

    const sortedClassList = windiSorter.sortClassNames(classes)

    expect(sortedClassList).toBe(correct)
  })
})

describe('Has Important Sort', () => {
  it('Without group syntax', () => {
    const windiSorter = new WindiSorter({ useVariantGroup: false })

    const classes =
      '!z-10 container !sm:hover:font-medium text-left md:!text-center justify-center'
    const correct =
      'container justify-center text-left !z-10 sm:hover:!font-medium md:!text-center'

    const sortedClassList = windiSorter.sortClassNames(classes)

    expect(sortedClassList).toBe(correct)
  })

  it('With group syntax & In parentheses', () => {
    const windiSorter = new WindiSorter({ useVariantGroup: true })

    const classes = 'bg-white sm:hover:(!font-medium bg-gray-100) !font-light'
    const correct = 'bg-white !font-light sm:hover:(bg-gray-100 !font-medium)'

    const sortedClassList = windiSorter.sortClassNames(classes)

    expect(sortedClassList).toBe(correct)
  })

  it('With group syntax & Out parentheses', () => {
    const windiSorter = new WindiSorter({ useVariantGroup: true })

    const classes = 'bg-white !sm:hover:(font-medium bg-gray-100) !font-light'
    const correct = 'bg-white !font-light sm:hover:(!bg-gray-100 !font-medium)'

    const sortedClassList = windiSorter.sortClassNames(classes)

    expect(sortedClassList).toBe(correct)
  })
})
