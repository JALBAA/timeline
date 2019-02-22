export function mixin (t: any) {
    return function (constructor: Function) {
        constructor.prototype.tt = t.prototype.tt
    }
}

export function mixedFn (target:any , propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target,'is target', propertyKey,'is key', descriptor, 'is descriptor')
}

export function mixinFunction (fn: any) {
    return function (target:any , propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target,'is target', propertyKey,'is key', descriptor, 'is descriptor')
        // target[propertyKey] = fn[propertyKey]
        descriptor.value = function (...args: any[]) {
            return fn.apply(this, [this].concat(args))
        }
    }
}