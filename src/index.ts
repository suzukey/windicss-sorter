import type { Options, RequiredOptions } from '@/interfaces'

import {
  createUtils,
  UserOptions,
  WindiPluginUtils,
} from '@windicss/plugin-utils'

import Parser from '@/utils/parser'
import Combiner from '@/utils/combiner'
import Separator from '@/utils/separator'
import Weighter from '@/utils/weighter'
import Sorter from '@/utils/sorter'
import Outputter from '@/utils/outputter'

const NAME = 'windicss-sorter'

export default class WindiSorter {
  public priorityOrderList: RequiredOptions['priorityOrderList']
  public sortOrder: RequiredOptions['sortOrder']
  public sortUnknowns: RequiredOptions['sortUnknowns']
  public unknownClassNamesPosition: RequiredOptions['unknownClassNamesPosition']
  public removeDuplicateClassNames: RequiredOptions['removeDuplicateClassNames']
  public useVariantGroup: RequiredOptions['useVariantGroup']
  public config: RequiredOptions['config']
  private utils: WindiPluginUtils

  constructor(opts: Options = {}, utils: WindiSorter['utils']) {
    this.priorityOrderList = opts.priorityOrderList || []
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

    this.utils = utils
  }

  public static async init(
    opts: Options = {},
    userOptions: UserOptions = {}
  ): Promise<WindiSorter> {
    const utils = createUtils(userOptions, { name: NAME })
    const sorter = new WindiSorter(opts, utils)
    await sorter.utils.init()
    return sorter
  }

  private getWindiVariants(): Array<string> {
    const variants = Object.keys(this.utils.processor.resolveVariants() ?? {})
    const windiVariants = [...variants.map((value) => value)]
    return windiVariants
  }

  public sortClassNames(classNames: string): string {
    const unknownClasses = this.utils.processor.interpret(classNames).ignored
    const windiVariants = this.getWindiVariants()

    // Parse class names
    const parsedElements = new Parser(classNames).parse(
      this.removeDuplicateClassNames
    )

    // Combine variant groups
    const combinedElements = new Combiner(parsedElements).combine()

    // Separate Windi classes from unknown classes
    const separatedElements = new Separator(
      combinedElements,
      unknownClasses
    ).separate()

    // Give weights to determine the order of the classes
    const weighter = new Weighter(this.priorityOrderList, windiVariants)
    const windiElementsWithWeight = weighter.weighting(
      separatedElements.windiElements
    )
    const unknownElementsWithWeight = weighter.weighting(
      separatedElements.unknownElements
    )

    // Sort classes based on weight
    const sorter = new Sorter(this.sortOrder, windiVariants)
    const windiElements = sorter.sort(windiElementsWithWeight)
    const unknownElements = this.sortUnknowns
      ? sorter.sort(unknownElementsWithWeight)
      : separatedElements.unknownElements

    // Concatenate what was processed separately
    const concatenatedElements =
      this.unknownClassNamesPosition === 'start'
        ? unknownElements.concat(windiElements)
        : windiElements.concat(unknownElements)

    // Output as a class string
    const output = new Outputter(concatenatedElements).output(
      this.useVariantGroup
    )

    return output
  }
}
