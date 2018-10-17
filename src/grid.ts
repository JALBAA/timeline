export const unit = 40
export default class Grid {
    private _value = 0
    get value (): number {
        return this._value
    }
    constructor (n: number | Grid) {
        if (n instanceof Grid) {
            this._value = n.valueOf()
        } else {
            this._value = n * unit
        }
    }
    add (g: Grid) {
        return new Grid((this._value + g.value) / unit)
    }
    sub (g: Grid) {
        return new Grid((this._value - g.value) / unit)
    }
    mul (g: Grid | number): Grid {
        if (g instanceof Number) {
            return new Grid(this._value * (g as number))
        } else {
            return new Grid((this._value / unit) * ((g as Grid).value / unit))
        }
    }
    div (g: Grid | number): Grid {
        if (g instanceof Number) {
            return new Grid(this._value / (g as number))
        } else {
            return new Grid((this._value / unit) / ((g as Grid).value / unit))
        }
    }
    valueOf (): number {
        return this.value
    }
    toString (): string {
        return this.value.toString()
    }
}
