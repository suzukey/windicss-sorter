import type { Element as WindiElement } from 'windicss/types/interfaces'
import type { Element } from '@/interfaces'

import { ClassParser } from 'windicss/utils/parser'

export default class Parser {
  private classNames?: string

  constructor(classNames?: string) {
    this.classNames = classNames
  }

  public parse(removeDuplicates = true): Element[] {
    const windiElements = new ClassParser(this.classNames).parse(
      removeDuplicates
    )
    const ast = windiElements.map((el) => this._parse(el))

    return ast
  }

  private _parse({ content, variants, important }: WindiElement): Element {
    if (Array.isArray(content)) {
      return {
        content: content.map((el) => this._parse(el)),
        variants,
        important,
      }
    }

    return { content, variants, important }
  }
}
