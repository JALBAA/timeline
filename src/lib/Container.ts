import { Drawable } from "./interface/Drawable"
import { Vector } from "./utils/vector";

export abstract class Container implements Drawable {
    x: number = 0
    y: number = 0
    pos: Vector
    parent: Drawable = null
    children: Set<Drawable> = new Set
    beforeDraw (ctx: CanvasRenderingContext2D) {
        ctx.save()
    }
    draw (ctx: CanvasRenderingContext2D) {
        this.beforeDraw(ctx)
        this.transform()
        this.children.forEach(child => {
            child.draw(ctx)
        })
        this.afterDraw(ctx)
    }
    afterDraw (ctx: CanvasRenderingContext2D) {
        ctx.restore()
    }
    add (child: Drawable) {
        this.children.add(child)
    }
    remove(child: Drawable) {
        this.children.delete(child)
    }
    move (pos: {x: number, y: number}) {}
    moveX (distance: number) {}
    moveY (distance: number) {}
    moveTo (pos: {x: number , y: number}) {}
    transform () : void {

    }
}