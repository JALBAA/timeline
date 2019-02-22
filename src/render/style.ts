

export enum BorderType {
    Solid = 'solid',
    Dashed = 'dashed',
}


export enum FlexAlign {
    Center = 'center',
    Start = 'start',
    End = 'end',
    Strech = 'strech',
}
export enum UnitType {
    PX =  'px',
    REM = 'rem',
    Percent = 'percent',
    Auto = 'auto',
}
export class Unit {
    type: UnitType = UnitType.PX
    value: number = 0
    static _isTypeEqual (...args: Unit[]) : boolean {
        // if (v1.type == v2.type) return true
        // else return false
        if (args.length == 0) return false
        else {
            return args.every(arg => arg.type == args[0].type)
        }
    }
    // static isTypeComputeable (v1: Unit, v2: Unit) : boolean {
    //     if (v1.type != 'auto' && v2.type != 'auto') return true
    //     else return false
    // }
    static _compute (sign: (v1: number, v2: number) => number, ...args: Unit[]) : Unit {
        if (Unit._isTypeEqual(...args)) {
            const unitType = args[0].type
            return new Unit(args.reduce((prev, cur) => {
                return new Unit(sign(prev.value, cur.value), unitType)
            }).value, unitType)
        } else {
            throw new Error('types not equal')
        }
    }
    static add (...args: Unit[]) : Unit {
        return Unit._compute((a, b) => {return a + b}, ...args)
    }
    static sub (...args: Unit[]) : Unit {
        return Unit._compute((a, b) => {return a - b}, ...args)
    }
    static mul (...args: Unit[]) : Unit {
        return Unit._compute((a, b) => {return a * b}, ...args)
    }
    static div (...args: Unit[]) : Unit {
        return Unit._compute((a, b) => {return a / b}, ...args)
    }
    
    constructor (value: string | number, type: UnitType = UnitType.PX) {
        if (typeof value == 'string') {
            if (value == 'auto') {
                this.value = NaN
                this.type = UnitType.Auto
            } else {
                const valueAndType = value.split(/(.+)(px|rem|%)/)
                if (valueAndType) {
                    valueAndType.pop()
                    valueAndType.shift()
                    this.value = Number(valueAndType[0])
                    const type = valueAndType[1]
                    switch (type) {
                        case 'px':
                            this.type = UnitType.PX
                            break
                        case 'rem':
                            this.type = UnitType.REM
                            break
                        case '%':
                            this.type = UnitType.Percent
                            break
                    }
                }
            }
        } else {
            this.value = value
            this.type = type
        }
    }
    toString () {
        return this.value + this.type.toString()
    }
    copy (val: Unit) {
        this.value = val.value
        this.type = val.type
    }
}
export class PixelUnit extends Unit {
    constructor (value: number | string) {
        super(value)
    }
}

export class AutoUnit extends Unit {
    constructor () {
        super('auto')
    }
}

export class PercentUnit extends Unit {
    constructor (value: string | string) {
        super(value, UnitType.Percent)
    }
}

export abstract class Box {
    left: Unit = new Unit(0)
    right: Unit = new Unit(0)
    top: Unit = new Unit(0)
    bottom: Unit = new Unit(0)
    constructor (box? :{
        left?: Unit,
        right?: Unit,
        top?: Unit,
        bottom?: Unit,
    }) {
        if (box) {
            if (box.left) this.left = box.left
            if (box.right) this.right = box.right
            if (box.top) this.top = box.top
            if (box.bottom) this.bottom = box.bottom
        }
    }
}

export class Padding extends Box {}

export class Margin extends Box {}

export class Color {
    r: number = 0
    g: number = 0
    b: number = 0
    static hexToNumber (s: string) {
        function hexCharToNumber (char: string) {
            switch (char) {
                case 'a':
                    return 10
                case 'b':
                    return 11
                case 'c':
                    return 12
                case 'd':
                    return 13
                case 'e':
                    return 14
                case 'f':
                    return 15
                default:
                    return Number(char)
            }
        }
        const c1 = s[0]
        const c2 = s[1]
        return hexCharToNumber(c1) * hexCharToNumber(c2)
    }
    constructor (r: string | number, g: number = 0, b: number = 0) {
        if (typeof r == 'string') {
            if (r[0] != '#') throw new Error('valid hex type')
            r = r.replace(/^\#/, '')
            this.r = Number(Color.hexToNumber(r.slice(0, 2)))
            this.g = Number(Color.hexToNumber(r.slice(2, 4)))
            this.b = Number(Color.hexToNumber(r.slice(4, 6)))
        } else {
            this.r = r
            this.g = g
            this.b = b
        }
    }
}

class BorderStyle {

}

class BackgroundStyle {

}



class ElementStyle {
    border?: BorderStyle
    background?: BackgroundStyle
}

class TextStyle {
    // fontSize
    // fontColor
    // fontWeight
}

class FlexItem {
    flex: number = 1
}

interface Layout {

}

interface FlexItem {
    flex: number
}

class AbsoluteLayout {

}