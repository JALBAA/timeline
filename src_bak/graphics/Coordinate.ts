import {Coord} from '../interface/ICoordinate'
import ICoordinate from '../interface/ICoordinate'
let cid = 0
export default class Coordinate implements ICoordinate {
    protected _x: number = 0
    protected _y: number = 0
    height: number = 0
    width: number = 0
    protected _parent: ICoordinate | null = null
    protected _children: ICoordinate[] = []
    private _cid = 0
    get x () {
        return this._x
    }
    get y () {
        return this._y
    }
    get children () {
        return this._children
    }
    get cid () {
        return this._cid
    }
    get parent () {
        return this._parent
    }
    constructor () {
        this._cid = cid++
    }
    addChild (child: ICoordinate) {
        this.children.push(child)
        child.setParent(this)
    }
    setParent (parent: ICoordinate) {
        this._parent = parent
    }
    setChildren (children: ICoordinate[]) {
        this._children = children
    }
    removeChild (target: ICoordinate) {
        this.setChildren(this.children.filter(child => child.cid != target.cid))
    }
    getWorldCoord (): Coord {
        if (this.parent == null) {
            return {
                x: this.x, 
                y: this.y,
            }
        } else {
            // 变换
            return this._transform(this.parent, {x: this.x, y: this.y})
        }
    }
    getPos (): Coord {
        return {
            x: this.x,
            y: this.y,
        }
    }
    setPos ({x, y}: {x: number, y: number}): void {
        this._x = x
        this._y = y
        this._posChange()
    }
    protected _posChange () {}
    private _transform (parent: ICoordinate, coord: Coord): Coord {
        const x = parent.x + coord.x
        const y = parent.y + coord.y
        if (parent.parent != null) {
            return this._transform(parent.parent, {x, y})
        } else {
            return {x, y}
        }
    }
}