import type { Options, RequiredOptions } from '@/interfaces'

import { Processor } from 'windicss/lib'

import { resolveConfig } from '@/utils/config'
import { defaultKeyOrder } from '@/utils/order'
import Parser from '@/utils/parser'
import Combiner from '@/utils/combiner'
import Separator from '@/utils/separator'
import Sorter from '@/utils/sorter'
import Outputter from '@/utils/outputter'

export default class WindiSorter {
  public windiClassNamesOrder: RequiredOptions['windiClassNamesOrder']
  public unknownClassNamesPosition: RequiredOptions['unknownClassNamesPosition']
  public sortUnknownClassNames: RequiredOptions['sortUnknownClassNames']
  public removeDuplicateClassNames: RequiredOptions['removeDuplicateClassNames']
  public useVariantGroup: RequiredOptions['useVariantGroup']
  public config: RequiredOptions['config']
  private processor: Processor

  constructor(opts: Options = {}) {
    this.windiClassNamesOrder = opts.windiClassNamesOrder || defaultKeyOrder
    this.unknownClassNamesPosition = opts.unknownClassNamesPosition || 'end'
    this.sortUnknownClassNames = opts.sortUnknownClassNames || 'asc'
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

  public sortClassNames(classNames: string) {
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

    const sorter = new Sorter(
      this.windiClassNamesOrder,
      windiVariants,
      this.sortUnknownClassNames
    )
    const windiElements = sorter.sortWindi(separatedElements.windiElements)
    const unknownElements = sorter.sortUnknown(
      separatedElements.unknownElements
    )

    const mixedElements =
      this.unknownClassNamesPosition === 'start'
        ? unknownElements.concat(windiElements)
        : windiElements.concat(unknownElements)

    const output = new Outputter(mixedElements).output(this.useVariantGroup)

    return output
  }
}
