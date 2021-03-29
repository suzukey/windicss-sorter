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

export interface RequiredOptions {
  windiClassNamesOrder: 'asc' | 'desc' | Array<string>
  unknownClassNamesPosition: 'start' | 'end'
  sortUnknownClassNames: 'asc' | 'desc' | 'disable'
  removeDuplicateClassNames: boolean
  useVariantGroup: boolean
  config: string | Record<string, unknown> | undefined
}

export interface Options {
  /** __Order of windi classes__ */
  windiClassNamesOrder?: RequiredOptions['windiClassNamesOrder']

  /** __Position of unknown classes__ */
  unknownClassNamesPosition?: RequiredOptions['unknownClassNamesPosition']

  /** __Sort unknown classes__ */
  sortUnknownClassNames?: RequiredOptions['sortUnknownClassNames']

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
