import Grid from "../grid";

export type Coord = {
    x: Grid,
    y: Grid,
}
export const UNIT: number = 10
let cid: number = 0

export interface Styleable {
    style () : void
}
type StyleableRenderable = {
    prototype: {
        onDraw (): void,
        style () : void,
        // __proto__: any,
    },
}
type SuperStyle = {
    style () : void,
    __proto__: SuperStyle | undefined | null,
}
export function Styler <T extends StyleableRenderable> (cons: T) : T {
    // const draw = cons.prototype.onDraw
    // cons.prototype.onDraw = function (...args: []) {
    //     this.style()
    //     const superStyle = (sup: SuperStyle) => {
    //         if (sup && sup.style) {
    //             sup.style.apply(this)
    //             if (sup.__proto__)
    //                 superStyle(sup.__proto__)
    //         }
    //     }
    //     // if (this.__proto__)
    //         // superStyle(this.__proto__)
    //     draw.apply(this, args)
    // }
    return cons
}
export interface Renderable {
    coord: Coord,
    height: Grid,
    width: Grid,
    node: SVGElement | null,
    parent: Renderable | null,
    cid: number,
    addParent (parent: Renderable): void
    removeParent (): void
    addChild (child: Renderable): void
    removeChild (target: Renderable): void
    removeAll (): void
    getWorldPos (): Coord
    translate (coord: Coord): void
    draw (): void
    beforeDraw () : void
    afterDraw () : void
}


export default abstract class RenderableObject implements Renderable {
    coord = {
        x: new Grid(0),
        y: new Grid(0),
    }
    height = new Grid(1)
    width = new Grid(1)
    node: SVGElement | null = null
    protected _parent: Renderable | null = null
    protected _children: Renderable[] = []
    get parent () {
        return this._parent
    }
    get children () {
        return this._children
    }
    protected _cid = 0
    get cid () {
        return this._cid
    }
    constructor () {
        this._cid = ++cid
    }
    addParent (parent: Renderable) {
        this._parent = parent
    }
    removeParent () {
        this._parent = null
    }
    addChild (child: Renderable) {
        this._children.push(child)
        child.addParent(this as Renderable)
        if (this.node && child.node) {
            this.node.appendChild(child.node)
        }
    }
    removeChild (target: Renderable) {
        this._children = this._children.filter(child => {
            const r = child.cid != target.cid
            if (r && this.node && target.node) {
                target.removeParent()
                this.node.removeChild(target.node)
            }
            return r
        })
    }
    removeAll () {
        this._children = this._children.filter(child => {
            if (this.node && child.node) {
                child.removeParent()
                this.node.removeChild(child.node)
            }
            return false
        })
    }
    protected _transform (parent: Renderable, coord: Coord): Coord {
        const x = parent.coord.x.add(coord.x)
        const y = parent.coord.y.add(coord.y)
        if (parent.parent !== null) {
            return this._transform(parent.parent, {x, y})
        } else {
            return {x, y}
        }
    }
    getWorldPos () : Coord {
        if (this.parent === null) {
            return this.coord
        } else {
            // 变换
            return this._transform(this.parent, this.coord)
        }
    }
    translate (coord: Coord) {
        // deepcopy，防止引用发生
        this.coord = {
            x: new Grid(coord.x),
            y: new Grid(coord.y),
        }
    }
    protected _nodeTranslate (coord: Coord) {

    }
    protected _draw (coord: Coord) {

    }
    onDraw () {

    }
    draw () {
        this.beforeDraw()
        // const coord = this.getWorldPos()
        this.onDraw()
        this.children.forEach(child => child.draw())
        this.afterDraw()
    }
    beforeDraw () {
    }
    afterDraw () {

    }
}