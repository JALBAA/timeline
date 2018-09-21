export default function Position ({x, y}: {
    x: number,
    y: number,
}) {
    return function deco <T extends {new (...args:any[]):{}}>  (constructor: T){
        return class extends constructor {
            z = x
            t = y
        }
    }
}