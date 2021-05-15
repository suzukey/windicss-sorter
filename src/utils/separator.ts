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

    this.sorterElements.forEach((sorterEl) => {
      sorterEl.content.forEach((innerEl) => {
        const target = this.isWindiUtility(innerEl.content, sorterEl.variants)
          ? windiElements
          : unknownElements

        const groupEl = target.find((targetEl) =>
          isSameArray(targetEl.variants, sorterEl.variants)
        )

        if (groupEl) {
          groupEl.content.push(innerEl)
        } else {
          target.push({
            content: [innerEl],
            variants: sorterEl.variants,
          })
        }
      })
    })

    return {
      windiElements,
      unknownElements,
    }
  }

  private isWindiUtility(className: string, variants: Array<string>): boolean {
    const isUnknown = this.unknownClassList.find((cls) => {
      const clsHeads = cls.split(':')
      const clsName = clsHeads.pop()

      return className === clsName && isSameArray(clsHeads, variants)
    })

    return !isUnknown
  }
}
