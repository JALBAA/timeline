import {Point} from './Point'
import {Global} from './enum/global'
import {Drawable} from './interface/Drawable'
import {Tile} from './Tile'
import { Container } from './Container';
export class Line extends Container {
    x: number = 0
    y: number = 0
    get width () : number {
        return this.children.size * Global.unit
    }
    height: number = 1
    parent: Drawable = null
    children: Set<Drawable> = new Set
    tiles: Tile[] = []
    constructor () {
        super()
        const tile = new Tile
        this.grow()
    }
    grow () {
        const tile = new Tile
        tile.moveTo({
            x: this.x + this.width,
            y: this.y
        })
        this.children.add(tile)
        this.tiles.push(tile)
    }
    shrink () {
        this.children.delete(this.tiles.pop())
    }
    beforeDraw (ctx: CanvasRenderingContext2D) {
        ctx.save()
    }
    draw (ctx: CanvasRenderingContext2D) {
        this.beforeDraw(ctx)
        this.children.forEach(item => item.draw(ctx))
        this.afterDraw(ctx)
    }
    afterDraw (ctx: CanvasRenderingContext2D) {
        ctx.restore()
    }
    move (pos: {x: number, y: number}) : void{}
    moveX (distance: number) : void{}
    moveY (distance: number) : void{}
    moveTo (pos: {x: number , y: number}) : void{}
}