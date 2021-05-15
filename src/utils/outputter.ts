import { SorterElement, RequiredOptions } from '@/interfaces'

export default class Outputter {
  private sorterElements: SorterElement[]

  constructor(sorterElements: SorterElement[]) {
    this.sorterElements = sorterElements
  }

  public output(useVariantGroup: RequiredOptions['useVariantGroup']): string {
    const classNames = this.sorterElements.map((sorterEl) => {
      const head = sorterEl.variants.length
        ? `${sorterEl.variants.join(':')}:`
        : ''

      const innerCls = sorterEl.content
        .map((innerEl) => {
          return useVariantGroup
            ? `${innerEl.important ? '!' : ''}${innerEl.content}`
            : `${head}${innerEl.important ? '!' : ''}${innerEl.content}`
        })
        .join(' ')

      return useVariantGroup && head ? `${head}(${innerCls})` : `${innerCls}`
    })

    return classNames.join(' ')
  }
}
