export default function Mixin (A:{new (...args:any[]):{}}) {
    return function <T extends {new (...args:any[]):{}}>  (B: T){
        Object.getOwnPropertyNames(A.prototype)
                .forEach(name => {
                    B.prototype[name] = A.prototype[name]
                })
        return B
    }
}