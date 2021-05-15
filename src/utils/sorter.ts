import type {
  SorterElement,
  ElementWithWeight,
  InnerElementWithWeight,
} from '@/interfaces'

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

  public sort(el: ElementWithWeight[]): SorterElement[] {
    const res = el.map((sorterEl) => {
      sorterEl.content.sort((a, b) => {
        return this.compareInnerElement(a, b)
      })
      this.sortVariants(sorterEl)

      return sorterEl
    })

    res.sort((a, b) => {
      return this.compareSorterElement(a, b)
    })

    return res
  }

  private sortVariants(el: ElementWithWeight): ElementWithWeight {
    el.variants.sort(
      (a, b) => this.windiVariants.indexOf(a) - this.windiVariants.indexOf(b)
    )
    return el
  }

  private compareSorterElement(
    a: ElementWithWeight,
    b: ElementWithWeight
  ): number {
    if (a.variantsWeight < b.variantsWeight) return -1
    if (a.variantsWeight > b.variantsWeight) return 1

    return 0
  }

  private compareInnerElement(
    a: InnerElementWithWeight,
    b: InnerElementWithWeight
  ): number {
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
