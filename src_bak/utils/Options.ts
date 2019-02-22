export const enum OptionState {
    Some,
    None,
    Undefined,
}
export function has<T> (val: Options<T> | T | null) : Options<T> {
    if (val instanceof Options) {
        return val
    } else {
        return new Options(val)
    }
}
export function hasAll (vals: any[] | null) : Options<any[]>  {
    if (Array.isArray(vals)) {
        const result = vals.filter(val => {
            if (val === null) {
                return false
            } else {
                return true
            }
        })
        if (result.length == vals.length)
            return new Options(vals)
    }
    return new Options(vals, true)
}
export default class Options<T> {
    private val: T | undefined | null = undefined
    private state: OptionState = OptionState.Undefined
    constructor (val: T | null, forceNull?: boolean) {
        this.val = val
        if (forceNull) {
            this.val = null
        }
        if (val === null) {
            this.state = OptionState.None
        } else {
            this.state = OptionState.Some
        }

    }
    some (cb: (val: T) => void): Options<T> {
        if (this.state == OptionState.Some) {
            cb(this.val as T)
        }
        if (this.state != OptionState.Undefined) {
            return new Options(this.val as T | null)
        } else {
            return this
        }
    }
    none (cb: (val: null) => void): Options<T> {
        if (this.state == OptionState.None) {
            cb(null)
        }
        if (this.state != OptionState.Undefined) {
            return new Options(this.val as T | null)
        } else {
            return this
        }
    }
    
}