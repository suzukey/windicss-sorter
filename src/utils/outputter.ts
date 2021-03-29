import { Element, RequiredOptions } from '@/interfaces'

export default class Outputter {
  private sorterElements: Element[]

  constructor(sorterElements: Element[]) {
    this.sorterElements = sorterElements
  }

  public output(useVariantGroup: RequiredOptions['useVariantGroup']): string {
    const classNames = useVariantGroup
      ? this.sorterElements.map((el) => this._outputUseGroup(el, []))
      : this.sorterElements.map((el) => this._outputNoGroup(el, []))

    return classNames.join(' ')
  }

  private _outputUseGroup(el: Element, vars: Array<string>): string {
    const variants = vars.concat(el.variants)

    if (Array.isArray(el.content)) {
      const head = `${variants.join(':')}:`
      const cls = el.content.map((el) => this._outputUseGroup(el, variants))

      return `${head}(${cls.join(' ')})`
    }

    return (el.important ? '!' : '') + el.content
  }

  private _outputNoGroup(el: Element, vars: Array<string>): string {
    const variants = vars.concat(el.variants)

    if (Array.isArray(el.content)) {
      const cls = el.content.map((el) => this._outputNoGroup(el, variants))

      return cls.join(' ')
    } else if (typeof el.content === 'string' && variants.length) {
      const head = `${variants.join(':')}:`

      return `${head}${el.important ? '!' : ''}${el.content}`
    }

    return (el.important ? '!' : '') + el.content
  }
}
