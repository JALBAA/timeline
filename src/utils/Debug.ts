import RenderableObject from "../graphics/RenderableObject";
import Grid from "../grid";

class Tile extends RenderableObject{
    node: SVGRectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    height = new Grid(1)
    width = new Grid(1)
    blackOrWhite = 'black'
    _draw () {
        this.node.setAttribute('width', this.height.value.toString())
        this.node.setAttribute('height', this.width.value.toString())
        this.node.setAttribute('x', (this.coord.x.value/* - this.height.value/2*/).toString())
        this.node.setAttribute('y', (this.coord.y.value/* - this.height.value/2*/).toString())
        if (this.blackOrWhite == 'black')
            this.node.setAttribute('style', 'stroke-width: 0;stroke: gray;fill: rgba(120,0,0,0.2);')
        else
            this.node.setAttribute('style', 'stroke-width: 0;stroke: gray;fill: rgba(120,255,255,0.2);')
    }
}

export class DebugGrid extends RenderableObject{
    node: SVGGElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    _draw () {
        // this.node.setAttribute('style', 'stroke-width: 1;stroke: gray;fill: rgba(0,0,0,0.4);')
    }
    constructor () {
        super()
        for (let x = 0; x < 30; x++) {
            for (let y = 0; y < 30; y++) {
                const tile = new Tile()
                if (x % 2 == 0) {
                    if (y % 2 == 0) {
                        tile.blackOrWhite = 'black'
                    } else {
                        tile.blackOrWhite = 'white'
                    }
                } else {
                    if (y % 2 == 0) {
                        tile.blackOrWhite = 'white'
                    } else {
                        tile.blackOrWhite = 'black'
                    }
                }
                tile.translate({
                    x: new Grid(x),
                    y: new Grid(y),
                })
                this.addChild(tile)
            }
        }
    }
}