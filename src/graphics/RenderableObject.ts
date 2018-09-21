import Grid from "../grid";

export type Coord = {
    x: Grid,
    y: Grid,
}
export const UNIT: number = 10
let cid: number = 0
export default abstract class RenderableObject {
    coord = {
        x: new Grid(0),
        y: new Grid(0),
    }
    height = new Grid(1)
    width = new Grid(1)
    node: SVGElement | null = null
    protected _parent: RenderableObject | null = null
    protected _children: RenderableObject[] = []
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
    addParent (parent: RenderableObject) {
        this._parent = parent
    }
    removeParent () {
        this._parent = null
    }
    addChild (child: RenderableObject) {
        this._children.push(child)
        child.addParent(this)
        if (this.node && child.node) {
            this.node.appendChild(child.node)
        }
    }
    removeChild (target: RenderableObject) {
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
    protected _transform (parent: RenderableObject, coord: Coord): Coord {
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
    draw () {
        const coord = this.getWorldPos()
        this._draw(coord)
        this.children.forEach(child => child.draw())
    }
}