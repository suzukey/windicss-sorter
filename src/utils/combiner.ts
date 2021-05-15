import type { InnerElement, ParsedElement, SorterElement } from '@/interfaces'

import { isSameArray } from '@/utils'

export default class Combiner {
  private parsedElements: ParsedElement[]
  private combinedElements: SorterElement[]

  constructor(parsedElements: ParsedElement[]) {
    this.parsedElements = parsedElements
    this.combinedElements = []
  }

  public combine(): SorterElement[] {
    this.combinedElements = []

    this.parsedElements.forEach((el) => {
      this._combine(el)
    })

    return this.combinedElements
  }

  private _combine(
    { content, variants, important }: ParsedElement,
    vars: string[] = [],
    imp = false
  ): void {
    const combineVariants = vars.concat(variants)
    const importance = important || imp

    // If Element type Group
    if (Array.isArray(content)) {
      content.forEach((element) => {
        this._combine(element, combineVariants, importance)
      })
    }
    // Element with variants
    else {
      const innerEl: InnerElement = {
        content: content,
        important: importance,
      }

      const groupEl = this.combinedElements.find((targetEl) =>
        isSameArray(targetEl.variants, combineVariants)
      )

      if (groupEl) {
        groupEl.content.push(innerEl)
      } else {
        this.combinedElements.push({
          content: [innerEl],
          variants: combineVariants,
        })
      }
    }
  }
}
