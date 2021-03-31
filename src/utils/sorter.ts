import type { Element, RequiredOptions } from '@/interfaces'

export default class Sorter {
  private windiOrder: RequiredOptions['windiClassNamesOrder']
  private variants: Array<string>
  private unknownOrder: RequiredOptions['sortUnknownClassNames']

  constructor(
    windiOrder: RequiredOptions['windiClassNamesOrder'],
    variants: Array<string>,
    unknownOrder: RequiredOptions['sortUnknownClassNames']
  ) {
    this.windiOrder = windiOrder
    this.variants = variants
    this.unknownOrder = unknownOrder
  }

  public sortWindi(windiElements: Element[]): Element[] {
    // TODO: Sort here
    return windiElements.slice().sort()
  }

  public sortUnknown(unknownElements: Element[]): Element[] {
    if (this.unknownOrder === 'disable') {
      return unknownElements
    }

    // TODO: Sort here
    return unknownElements.slice().sort()
  }
}
