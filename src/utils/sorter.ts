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
    // TODO: Sort deep elements
    const res = elements.slice().sort((a, b) => {
      return this.compareElement(a, b)
    })

    return res
  }

  // private sortVariants(el: ElementWithWeight): ElementWithWeight {}

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
