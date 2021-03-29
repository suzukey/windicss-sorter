import type { Separate, Element } from '@/interfaces'

import { isSameArray } from '@/utils'

export default class Separator {
  private sorterElements: Element[]
  private windiElements: Element[]
  private unknownElements: Element[]
  private unknownClassList: Array<string>

  constructor(sorterElements: Element[], unknownClassList: Array<string>) {
    this.windiElements = []
    this.unknownElements = []

    this.sorterElements = sorterElements
    this.unknownClassList = unknownClassList
  }

  // TODO: Refactor method
  public separate(): Separate {
    this.sorterElements.forEach((el) => this._separate(el, []))

    return {
      windiElements: this.windiElements,
      unknownElements: this.unknownElements,
    }
  }

  private _separate(el: Element, vars: Array<string>) {
    const variants = vars.concat(el.variants)

    // If Element type Group
    if (el.variants.length && Array.isArray(el.content)) {
      el.content.forEach((el) => this._separate(el, variants))
    }
    // Element with variants
    else if (variants.length && typeof el.content === 'string') {
      const e: Element = {
        content: el.content,
        variants: [],
        important: el.important,
      }

      const target = this.isWindiUtility(el.content, variants)
        ? this.windiElements
        : this.unknownElements

      const groupEl = target.find((resEl) =>
        isSameArray(resEl.variants, variants)
      )
      if (groupEl && Array.isArray(groupEl.content)) {
        groupEl.content.push(e)
      } else {
        target.push({ content: [e], variants, important: false })
      }
    }
    // Element without variants
    else if (typeof el.content === 'string') {
      const target = this.isWindiUtility(el.content, variants)
        ? this.windiElements
        : this.unknownElements
      target.push(el)
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
