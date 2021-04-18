import type { Element as WindiElement } from 'windicss/types/interfaces'

export interface Separate {
  windiElements: Element[]
  unknownElements: Element[]
}

export interface Element {
  content: string | Element[] | undefined
  variants: WindiElement['variants']
  important: WindiElement['important']
}

export interface ElementWithWeight extends Element {
  contentWeight: number
  variantsWeight: BigInt
}

export interface RequiredOptions {
  priorityOrderList: Array<string>
  sortOrder: 'asc' | 'desc'
  sortUnknowns: boolean
  unknownClassNamesPosition: 'start' | 'end'
  removeDuplicateClassNames: boolean
  useVariantGroup: boolean
  config: string | Record<string, unknown> | undefined
}

export interface Options {
  /** __List of classes to be sorted preferentially__ */
  priorityOrderList?: RequiredOptions['priorityOrderList']

  /** __Standard sort order__ */
  sortOrder?: RequiredOptions['sortOrder']

  /** __Whether to sort unknown classes__ */
  sortUnknowns?: RequiredOptions['sortUnknowns']

  /** __Position of unknown classes__ */
  unknownClassNamesPosition?: RequiredOptions['unknownClassNamesPosition']

  /** __Remove duplicate classes__
   *
   * if the same class name exists, remove it
   */
  removeDuplicateClassNames?: RequiredOptions['removeDuplicateClassNames']

  /**
   * __Set how to write variants__
   *
   * true: `"sm:text-lg"` -> `"sm:(text-lg)"`
   *
   * false: `"sm:(text-lg)"` -> `"sm:text-lg"`
   */
  useVariantGroup?: RequiredOptions['useVariantGroup']

  config?: RequiredOptions['config']
}
