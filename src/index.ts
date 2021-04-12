import type { Options, RequiredOptions } from '@/interfaces'

import { Processor } from 'windicss/lib'
import { resolveConfig } from '@/utils/config'
import { defaultKeyOrder } from '@/utils/order'
import Parser from '@/utils/parser'
import Combiner from '@/utils/combiner'
import Separator from '@/utils/separator'
import Weighter from '@/utils/weighter'
import Sorter from '@/utils/sorter'
import Outputter from '@/utils/outputter'

export default class WindiSorter {
  public priorityOrderList: RequiredOptions['priorityOrderList']
  public sortOrder: RequiredOptions['sortOrder']
  public sortUnknowns: RequiredOptions['sortUnknowns']
  public unknownClassNamesPosition: RequiredOptions['unknownClassNamesPosition']
  public removeDuplicateClassNames: RequiredOptions['removeDuplicateClassNames']
  public useVariantGroup: RequiredOptions['useVariantGroup']
  public config: RequiredOptions['config']
  private processor: Processor

  constructor(opts: Options = {}) {
    this.priorityOrderList = opts.priorityOrderList || defaultKeyOrder
    this.sortOrder = opts.sortOrder || 'asc'
    this.sortUnknowns =
      typeof opts.sortUnknowns === 'boolean' ? opts.sortUnknowns : true
    this.unknownClassNamesPosition = opts.unknownClassNamesPosition || 'end'
    this.removeDuplicateClassNames =
      typeof opts.removeDuplicateClassNames === 'boolean'
        ? opts.removeDuplicateClassNames
        : true
    this.useVariantGroup =
      typeof opts.useVariantGroup === 'boolean' ? opts.useVariantGroup : true

    const options = resolveConfig()
    this.processor = new Processor(options)
  }

  private getWindiVariants(): Array<string> {
    const variants = Object.keys(this.processor.resolveVariants() ?? {})
    const windiVariants = [...variants.map((value) => value)]
    return windiVariants
  }

  public sortClassNames(classNames: string): string {
    const unknownClasses = this.processor.interpret(classNames).ignored
    const windiVariants = this.getWindiVariants()

    const sorterElements = new Parser(classNames).parse(
      this.removeDuplicateClassNames
    )

    const combinedElements = new Combiner(sorterElements).combine()

    const separatedElements = new Separator(
      combinedElements,
      unknownClasses
    ).separate()

    const weighter = new Weighter(
      this.priorityOrderList,
      this.sortOrder,
      windiVariants
    )
    const windiElementsWithWeight = weighter.weighting(
      separatedElements.windiElements
    )
    const unknownElementsWithWeight = weighter.weighting(
      separatedElements.unknownElements
    )

    const sorter = new Sorter()
    const windiElements = sorter.sort(windiElementsWithWeight)
    const unknownElements = sorter.sort(unknownElementsWithWeight)

    const mixedElements =
      this.unknownClassNamesPosition === 'start'
        ? unknownElements.concat(windiElements)
        : windiElements.concat(unknownElements)

    const output = new Outputter(mixedElements).output(this.useVariantGroup)

    return output
  }
}
