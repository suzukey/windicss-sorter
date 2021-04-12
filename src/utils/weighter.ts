import type { Element, ElementWithWeight } from '@/interfaces'

export default class Weighter {
  private priorityOrderList: Array<string>
  private sortOrder: 'asc' | 'desc'
  private variants: Array<string>

  constructor(
    priorityOrderList: Weighter['priorityOrderList'],
    sortOrder: Weighter['sortOrder'],
    variants: Weighter['variants']
  ) {
    this.priorityOrderList = priorityOrderList
    this.sortOrder = sortOrder
    this.variants = variants
  }

  public weighting(elements: Element[]): ElementWithWeight[] {
    const weightElements = elements.map((el) => this._weighting(el))

    return weightElements
  }

  private _weighting(el: Element): ElementWithWeight {
    if (Array.isArray(el.content)) {
      el.content.map((el) => this._weighting(el))
    }

    const weightElement = { ...el, weight: 1 }

    return weightElement
  }
}
