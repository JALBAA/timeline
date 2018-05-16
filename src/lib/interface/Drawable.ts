import {Position} from './Position'
export interface Drawable extends Position {
    parent: Drawable
    children: Set<Drawable>
    beforeDraw (ctx: CanvasRenderingContext2D) : void
    draw (ctx: CanvasRenderingContext2D) : void
    afterDraw (ctx: CanvasRenderingContext2D) : void
    add (child: Drawable) : void
    remove (child: Drawable) : void
}