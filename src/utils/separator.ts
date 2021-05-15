import type { SeparatedElements, SorterElement } from '@/interfaces'

import { isSameArray } from '@/utils'

export default class Separator {
  private sorterElements: SorterElement[]
  private unknownClassList: Array<string>

  constructor(
    sorterElements: SorterElement[],
    unknownClassList: Array<string>
  ) {
    this.sorterElements = sorterElements
    this.unknownClassList = unknownClassList
  }

  public separate(): SeparatedElements {
    const windiElements: SorterElement[] = []
    const unknownElements: SorterElement[] = []

    this.sorterElements.forEach((el) => {
      // Element with variants
      if (Array.isArray(el.content)) {
        el.content.forEach((innerEl) => {
          const target = this.isWindiUtility(innerEl.content, el.variants)
            ? windiElements
            : unknownElements

          const groupEl = target.find((targetEl) =>
            isSameArray(targetEl.variants, el.variants)
          )
          // Already exist in target array
          if (groupEl && Array.isArray(groupEl.content)) {
            groupEl.content.push(innerEl)
          } else {
            target.push({
              content: [innerEl],
              variants: el.variants,
              important: false,
            })
          }
        })
      }
      // Element without variants
      else if (typeof el.content === 'string') {
        const target = this.isWindiUtility(el.content)
          ? windiElements
          : unknownElements
        target.push(el)
      }
    })

    return {
      windiElements,
      unknownElements,
    }
  }

  private isWindiUtility(
    className: string,
    variants: Array<string> = []
  ): boolean {
    const isUnknown = this.unknownClassList.find((cls) => {
      const clsHeads = cls.split(':')
      const clsName = clsHeads.pop()

      return className === clsName && isSameArray(clsHeads, variants)
    })

    return !isUnknown
  }
}
