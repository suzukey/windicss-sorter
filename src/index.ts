import type { Options, RequiredOptions } from '@/interfaces'

import { Processor } from 'windicss/lib'

import { resolveConfig } from '@/utils/config'
import { defaultKeyOrder } from '@/utils/order'
import Parser from '@/utils/parser'
import Combiner from '@/utils/combiner'

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
    const windiVariants = this.getWindiVariants()

    const sorterElements = new Parser(classNames).parse(
      this.removeDuplicateClassNames
    )

    const combinedElements = new Combiner(sorterElements).combine()

    return combinedElements
  }
}
