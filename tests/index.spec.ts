import { compareClasses } from './utils'

describe('Simple Sort', () => {
  it('Without group syntax', () => {
    const options = { useVariantGroup: false }
    const target = 'z-50 z-10 container text-left md:text-center justify-center'
    const correct =
      'container justify-center text-left z-10 z-50 md:text-center'

    compareClasses(target, correct, options)
  })

  it('With group syntax', () => {
    const options = { useVariantGroup: true }
    const target = 'bg-white sm:hover:(font-medium bg-gray-100) font-light'
    const correct = 'bg-white font-light sm:hover:(bg-gray-100 font-medium)'

    compareClasses(target, correct, options)
  })
})

describe('Unknown Sort', () => {
  it('Without group syntax', () => {
    const options = { useVariantGroup: false }
    const target =
      'z-50 test z-10 container text-left md:text-center md:test justify-center'
    const correct =
      'container justify-center text-left z-10 z-50 md:text-center test md:test'

    compareClasses(target, correct, options)
  })

  it('With group syntax', () => {
    const options = { useVariantGroup: true }
    const target =
      'bg-white sm:hover:(font-medium bg-gray-100 test) font-light test test:(test text-bold)'
    const correct =
      'bg-white font-light sm:hover:(bg-gray-100 font-medium) test sm:hover:(test) test:(text-bold test)'

    compareClasses(target, correct, options)
  })
})

describe('Has Important Sort', () => {
  it('Without group syntax', () => {
    const options = { useVariantGroup: false }
    const target =
      '!z-10 container !sm:hover:font-medium text-left md:!text-center justify-center'
    const correct =
      'container justify-center text-left !z-10 sm:hover:!font-medium md:!text-center'

    compareClasses(target, correct, options)
  })

  it('With group syntax & In parentheses', () => {
    const options = { useVariantGroup: true }
    const target = 'bg-white sm:hover:(!font-medium bg-gray-100) !font-light'
    const correct = 'bg-white !font-light sm:hover:(bg-gray-100 !font-medium)'

    compareClasses(target, correct, options)
  })

  it('With group syntax & Out parentheses', () => {
    const options = { useVariantGroup: true }
    const target = 'bg-white !sm:hover:(font-medium bg-gray-100) !font-light'
    const correct = 'bg-white !font-light sm:hover:(!bg-gray-100 !font-medium)'

    compareClasses(target, correct, options)
  })
})
