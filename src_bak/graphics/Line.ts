
import Coordinate from "./Coordinate";
import Drawable from "../interface/Drawable";
import Dragable from "../interface/Dragable";
// import Handle from "./Handle";
import RenderableObject, { Coord, Styler, Styleable } from "./RenderableObject";
import Grid from "../grid";
import Container from "./Container";
import { SVGNS } from "../utils/Global";

export class Handle extends RenderableObject {
    node: SVGCircleElement = document.createElementNS(SVGNS, 'circle')
    radius: Grid = new Grid(.5)
    get width () {
        return this.radius.mul(new Grid(2))
    }
    get height () {
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
    node: SVGLineElement = document.createElementNS(SVGNS, 'line')
    onDraw () {
        this.node.setAttribute('x1', this.coord.x.toString())
        this.node.setAttribute('y1', this.coord.y.add(this.height.div(new Grid(2))).toString())
        this.node.setAttribute('x2', (this.coord.x.add(this.width)).value.toString())
        this.node.setAttribute('y2', this.coord.y.add(this.height.div(new Grid(2))).toString())
    }
}
@Styler
export default class Line extends Container implements Styleable {
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
    style () {
        if (this.node)
            this.node.setAttribute('style', 'stroke:black;stroke-width:2;fill:red')
    }
}