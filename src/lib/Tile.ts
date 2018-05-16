import {Point} from './Point'
import {Global} from './enum/global'
import {Drawable} from './interface/Drawable'
import { Container } from './Container';
export class Tile extends Container {
    parent: Drawable = null
    children: Set<Drawable> = new Set
    points: Point[] = []
    x: number = 0
    y: number = 0
    get width () : number {
        return this.points.length > 0 ? Math.abs(this.points[0].x - this.points[1].x) : 0
    }
    get height () : number {
        return this.points.length > 0 ? Math.abs(this.points[0].y - this.points[3].y) : 0
    }
    get position () : {x: number, y: number} {
        return {
            x: this.x,
            y: this.y,
        }
    }
    constructor () {
        super()
        // 1  2
        // 4  3
        const unit = Global.unit
        const lt = new Point({x: 0, y: 0})
        const rt = new Point({x: unit, y: 0})
        const rb = new Point({x: unit, y: unit})
        const lb = new Point({x: 0, y: unit})
        this.points = [lt, rt, rb, lb]
    }
    init (points: Array<Point>) {
        this.points = points
    }
    add (child: Drawable) {
        this.children.add(child)
    }
    remove (child: Drawable) {
        this.children.add(child)
    }
    move (pos: {x: number, y: number}) {
        const {x, y} = pos
        this.moveTo({
            x: this.x + x,
            y: this.y + y,
        })
    }
    moveX (distance: number) {
        this.moveTo({
            x: this.x + distance,
            y: this.y,
        })
    }
    moveY (distance: number) {
        this.moveTo({
            x: this.x,
            y: this.y + distance,
        })
    }
    moveTo (pos: {x: number , y: number}) {
        const {x, y} = pos
        const width = this.width
        const height = this.height
        this.points[0].x = x
        this.points[0].y = y
        this.points[1].x = x + width
        this.points[1].y = y
        this.points[2].x = x + width
        this.points[2].y = y + height
        this.points[3].x = x
        this.points[3].y = y + height
    }
    beforeDraw (ctx: CanvasRenderingContext2D) {
        ctx.save()
    }
    draw (ctx: CanvasRenderingContext2D) {
        this.beforeDraw(ctx)
        ctx.beginPath()
        ctx.moveTo(this.x + this.points[0].x, this.y + this.points[0].y)
        ctx.lineTo(this.x + this.points[1].x, this.y + this.points[1].y)
        ctx.lineTo(this.x + this.points[2].x, this.y + this.points[2].y)
        ctx.lineTo(this.x + this.points[3].x, this.y + this.points[3].y)
        ctx.lineTo(this.x + this.points[0].x, this.y + this.points[0].y)
        ctx.stroke()
        this.afterDraw(ctx)
    }
    afterDraw (ctx: CanvasRenderingContext2D) {
        ctx.restore()
    }
}