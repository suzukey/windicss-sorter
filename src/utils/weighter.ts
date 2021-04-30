import type { Element, ElementWithWeight } from '@/interfaces'

export default class Weighter {
  private priorityOrderList: Array<string>
  private windiVariants: Array<string>

  constructor(
    priorityOrderList: Weighter['priorityOrderList'],
    windiVariants: Weighter['windiVariants']
  ) {
    this.priorityOrderList = priorityOrderList
    this.windiVariants = windiVariants
  }

  public weighting(elements: Element[]): ElementWithWeight[] {
    const weightElements = elements.map((el) => this._weighting(el))

    return weightElements
  }

  private _weighting({
    content,
    variants,
    important,
  }: Element): ElementWithWeight {
    const contentWeight = this.computeContentWeight(content)
    const variantsWeight = this.computeVariantsWeight(variants)

    return {
      content: Array.isArray(content)
        ? content.map((el) => this._weighting(el))
        : content,
      variants,
      important,
      contentWeight,
      variantsWeight,
    }
  }

  private computeContentWeight(content: Element['content']): number {
    if (typeof content !== 'string') {
      return 0
    }
    const utility = this.pickUtility(content)

    const prioritizedWeight = this.priorityOrderList.indexOf(utility) + 1
    const unprioritizedWeight = this.computeUnprioritizedWeight()

    const contentWeight = prioritizedWeight
      ? prioritizedWeight
      : unprioritizedWeight

    return contentWeight
  }

  private computeVariantsWeight(variants: Element['variants']): BigInt {
    const variantsWeight = this.windiVariants
      .slice()
      .reverse()
      .reduce((acc, value, index) => {
        if (variants.includes(value)) {
          return acc + BigInt(1)
        }
        if (acc > 0) {
          return acc + BigInt('0b1' + '0'.repeat(index))
        }
        return acc
      }, BigInt(0))

    const unknownVariants = variants.filter(
      (variant) => !this.windiVariants.includes(variant)
    )
    const unknownWeight = unknownVariants.length
      ? BigInt('0b1' + '0'.repeat(this.windiVariants.length))
      : BigInt('0')

    return variantsWeight + unknownWeight
  }

  private pickUtility(content: string) {
    const utility = content.match(/\w+/)

    if (Array.isArray(utility)) {
      return utility[0] || ''
    }

    return ''
  }

  private computeUnprioritizedWeight() {
    const prioritizedCount = this.priorityOrderList.length
    const len = String(prioritizedCount).length

    return 10 ** (len + 1)
  }
}
