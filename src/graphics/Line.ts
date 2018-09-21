
import Coordinate from "./Coordinate";
import Drawable from "../interface/Drawable";
import Dragable from "../interface/Dragable";
// import Handle from "./Handle";
import RenderableObject, { Coord } from "./RenderableObject";
import Grid from "../grid";
import Container from "./Container";
// import { Coord } from "../interface/ICoordinate";

// export default class Line extends Coordinate implements Drawable, Dragable {
//     start: Handle = new Handle
//     end: Handle = new Handle
//     node: SVGLineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line')
//     constructor () {
//         super()
//         this.addChild(this.start)
//         this.addChild(this.end)
//         this.node.setAttribute('x1', this.start.x.toString())
//         this.node.setAttribute('y1', this.start.y.toString())
//         this.node.setAttribute('x2', this.end.x.toString())
//         this.node.setAttribute('y2', this.end.y.toString())
//         this.node.setAttribute('style', 'stroke:rgb(255,0,0);stroke-width:2')
//     }
//     protected _posChange () {
//         this.node.setAttribute('x1', this.start.x.toString())
//         this.node.setAttribute('y1', this.start.y.toString())
//     }
//     draw () {

//     }
//     onDrag () {

//     }
// }


const ns = 'http://www.w3.org/2000/svg'

export class Handle extends RenderableObject {
    node = document.createElementNS(ns, 'circle') as SVGCircleElement
    get width () {
        return this.height
    }
    set width (val: Grid) {
        this.height = val
    }
    constructor () {
        super()
        this.height = new Grid(0.25)
    }
    _draw () {
        this.node.setAttribute('cx', this.coord.x.toString())
        this.node.setAttribute('cy', this.coord.y.toString())
        this.node.setAttribute('r', (this.height.value).toString())
    }
}

export class Path extends RenderableObject {
    // private _height: number = 0
    // private _width: number = 0
    // get height () {
    //     return this._height
    // }
    // get width () {
    //     return this._width
    // }
    node: SVGLineElement = document.createElementNS(ns, 'line') as SVGLineElement
    _draw () {
        this.node.setAttribute('x1', this.coord.x.toString())
        this.node.setAttribute('y1', this.coord.y.toString())
        this.node.setAttribute('x2', (this.coord.x.add(this.width)).value.toString())
        this.node.setAttribute('y2', this.coord.y.toString())
    }
}
export default class Line extends Container {
    leftHandle = new Handle
    rightHandle = new Handle
    path = new Path
    private _width = new Grid(1)
    get width () {
        return this._width
    }
    constructor () {
        super()
        this.addChild(this.path)
        this.addChild(this.leftHandle)
        this.leftHandle.translate({
            x: this.leftHandle.width,
            y: this.coord.y
        })
        this.addChild(this.rightHandle)
    }
    set width (l: Grid) {
        if (this.rightHandle) {
            const coord = this.rightHandle.coord
            this._width = l
            this.rightHandle.translate({
                x: l.sub(this.rightHandle.width),
                y: coord.y,
            })
            this.path.width = l
        }
    }
    _draw () {
        super._draw()
        this.node.setAttribute('style', 'stroke:black;stroke-width:2;fill:red')
    }
}