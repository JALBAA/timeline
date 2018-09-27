import Coordinate from "./Coordinate";
import Drawable from "../interface/Drawable";
import Line from "./Line";
import RenderableObject, { Coord } from "./RenderableObject";
import Grid from "../grid";
import Container from "./Container";
const ns = 'http://www.w3.org/2000/svg'

class RailwayEntity extends RenderableObject {
    height = new Grid(1)
    coord = {
        x: new Grid(0),
        y: new Grid(0),
    }
    node = document.createElementNS(ns, 'rect')
    _draw ({x, y}: Coord) {
        if (this.parent) {
            this.node.setAttribute('height', this.height.toString())
            this.node.setAttribute('width',   (this.parent.width).mul(new Grid(50)).value.toString())
        }
        this.node.setAttribute('x', this.coord.x.toString())
        this.node.setAttribute('y', this.coord.y.toString())
        // this.node.setAttribute('y', (y.add(new Grid(.5)).value/* - this.height.value/2*/).toString())
        this.node.setAttribute('style', 'stroke-width: 0;stroke: gray;fill: rgba(0,0,0,0.2);')
    }
}

export default class Railway extends Container {
    // _draw () {
    //     this._detectCollision()
    // }
    // detect lines coliision
    railway: RailwayEntity = new RailwayEntity
    constructor () {
        super()
        this.addChild(this.railway)
    }
    _draw () {
        super._draw()
        this._detectCollision()
    }
    private _detectCollision () {
        // 
    }
    // addChild (child: Line) {
    //     super.addChild(child)
    // }
    // removeChild (child: Line) {
    //     super.removeChild(child)
    // }
}