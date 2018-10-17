
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
import { SVGNS } from "../utils/Global";


const ns = 'http://www.w3.org/2000/svg'

export class Handle extends RenderableObject {
    node: SVGCircleElement = document.createElementNS(ns, 'circle')
    radius: Grid = new Grid(.5)
    get width () {
        // this.width == this.height, they are all refer to radius
        return this.radius.mul(new Grid(2))
    }
    get height () {
        // this.width == this.height, they are all refer to radius
        return this.radius.mul(new Grid(2))
    }
    set width (val: Grid) {
        this.radius = val.div(new Grid(2))
    }
    set height (val: Grid) {
        this.radius = val.div(new Grid(2))
    }
    constructor () {
        super()
    }
    onDraw () {
        this.node.setAttribute('cx', this.coord.x.add(this.radius).toString())
        this.node.setAttribute('cy', this.coord.y.add(this.radius).toString())
        this.node.setAttribute('r', (this.radius.value).toString())
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
    node: SVGLineElement = document.createElementNS(ns, 'line')
    onDraw () {
        this.node.setAttribute('x1', this.coord.x.toString())
        this.node.setAttribute('y1', this.coord.y.add(this.height.div(new Grid(2))).toString())
        this.node.setAttribute('x2', (this.coord.x.add(this.width)).value.toString())
        this.node.setAttribute('y2', this.coord.y.add(this.height.div(new Grid(2))).toString())
    }
}

    function test(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('ee',target, propertyKey, descriptor)
        
    };
    const b = {}
    // function con (v: any) {
    //     v.prototype.tt = '111'
    // }
    interface Type extends Function {new (...args: any[]): any}
    function container<T extends Type>(constructor:T) {
        // const ff = function () {
        //     this.call(constructor)
        // }
        // class ff extends constructor {
        //     node = document.createElementNS(SVGNS, 'g')
        //     constructor (...args: any[]) {
        //         super(args)
        //     }
        // }
        // class extends constructor {
        //     node = document.createElementNS(SVGNS, 'g')
        // }
        // ff.prototype.node = document.createElementNS(SVGNS, 'g')
        const onDraw = constructor.prototype.onDraw
        constructor.prototype.onDraw = function () {
            this.node.setAttribute('transform', `translate(${this.coord.x}, ${this.coord.y})`)
            onDraw.call(this)
        }
        return constructor
    }
@container
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
        // this.path.translate({
        //     x: this.path.coord.x,
        //     y: new Grid(0),//this.path.height.div(new Grid(2)),
        // })
        this.addChild(this.leftHandle)
        // this.leftHandle.translate({
        //     x: this.leftHandle.width,
        //     y: new Grid(0), //this.height.div(new Grid(2)),
        // })
        this.addChild(this.rightHandle)
    }
    set width (l: Grid) {
        if (this.rightHandle) {
            const coord = this.rightHandle.coord
            this._width = l
            this.rightHandle.translate({
                x: l.sub(this.rightHandle.width),
                y: new Grid(0),///this.height.div(new Grid(2)),
            })
            this.path.width = l
        }
    }
    onDraw () {
        if (this.node)
            this.node.setAttribute('style', 'stroke:black;stroke-width:2;fill:red')
        // super.onDraw()
    }
}