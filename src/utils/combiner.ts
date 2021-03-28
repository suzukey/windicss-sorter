import type { Element } from '@/interfaces'

import { isSameArray } from '@/utils'

export default class Combiner {
  private sorterElements: Element[]
  private combinedElements: Element[]

  constructor(sorterElements: Element[]) {
    this.sorterElements = sorterElements
    this.combinedElements = []
  }

  public combine(): Element[] {
    this.combinedElements = []

    this.sorterElements.forEach((el) => {
      this._combine(el, [])
    })

    return this.combinedElements
  }

  private _combine(el: Element, vars: string[], imp = false): void {
    const variants = vars.concat(el.variants)
    const importance = el.important || imp

    // If Element type Group
    if (el.variants.length && Array.isArray(el.content)) {
      el.content.forEach((element) => {
        this._combine(element, variants, importance)
      })
    }
    // Element with variants
    else if (variants.length) {
      const e: Element = {
        content: el.content,
        variants: [],
        important: importance,
      }

      const groupEl = this.combinedElements.find((resEl) =>
        isSameArray(resEl.variants, variants)
      )
      if (groupEl && Array.isArray(groupEl.content)) {
        groupEl.content.push(e)
      } else {
        this.combinedElements.push({ content: [e], variants, important: false })
      }
    }
    // Element without variants
    else {
      this.combinedElements.push(el)
    }
  }
}
