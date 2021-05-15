import type {
  Config as WindiConfig,
  Element as WindiElement,
} from 'windicss/types/interfaces'

// -- Parsed ----------

export interface ParsedElement {
  content: string | ParsedElement[]
  variants: WindiElement['variants']
  important: WindiElement['important']
}

// -- Base ----------

export interface SorterElement {
  content: InnerElement[]
  variants: ParsedElement['variants']
}

export interface InnerElement {
  content: string
  important: ParsedElement['important']
}

// -- Separated ----------

export interface SeparatedElements {
  windiElements: SorterElement[]
  unknownElements: SorterElement[]
}

// -- WithWeight ----------

export interface ElementWithWeight extends SorterElement {
  content: InnerElementWithWeight[]
  variantsWeight: BigInt
}

export interface InnerElementWithWeight extends InnerElement {
  contentWeight: number
}

// -- Options ----------

export interface RequiredOptions {
  priorityOrderList: Array<string>
  sortOrder: 'asc' | 'desc'
  sortUnknowns: boolean
  unknownClassNamesPosition: 'start' | 'end'
  removeDuplicateClassNames: boolean
  useVariantGroup: boolean
  config?: string | WindiConfig
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
