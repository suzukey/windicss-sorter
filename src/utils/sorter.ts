import type { Element, ElementWithWeight } from '@/interfaces'

export default class Sorter {
  private sortOrder: 'asc' | 'desc'
  private windiVariants: Array<string>

  constructor(
    sortOrder: Sorter['sortOrder'],
    windiVariants: Sorter['windiVariants']
  ) {
    this.sortOrder = sortOrder
    this.windiVariants = windiVariants
  }

  public sort(elements: ElementWithWeight[]): Element[] {
    const elm = elements.map((el) => this._sortDeeper(el))
    const res = elm.slice().sort((a, b) => {
      return this.compareElement(a, b)
    })

    return res
  }

  private _sortDeeper(element: ElementWithWeight): ElementWithWeight {
    if (Array.isArray(element.content)) {
      element.content.map((el) => this._sortDeeper(el))
      element.content.sort((a, b) => {
        return this.compareElement(a, b)
      })
    }
    this.sortVariants(element)
    return element
  }

  private sortVariants(el: ElementWithWeight): ElementWithWeight {
    el.variants.sort(
      (a, b) => this.windiVariants.indexOf(a) - this.windiVariants.indexOf(b)
    )
    return el
  }

  private compareElement(a: ElementWithWeight, b: ElementWithWeight): number {
    if (a.variantsWeight < b.variantsWeight) return -1
    if (a.variantsWeight > b.variantsWeight) return 1

    if (!a.important && b.important) return -1
    if (a.important && !b.important) return 1

    if (a.contentWeight < b.contentWeight) return -1
    if (a.contentWeight > b.contentWeight) return 1

    if (typeof a.content === 'string' && typeof b.content === 'string') {
      if (a.content < b.content) {
        return this.sortOrder === 'asc' ? -1 : 1
      }
      if (a.content > b.content) {
        return this.sortOrder === 'asc' ? 1 : -1
      }
    }

    return 0
  }
}
