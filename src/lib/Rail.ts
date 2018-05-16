import {Position} from './interface/Position'
import { Drawable } from './interface/Drawable'
export class Rail implements Position, Drawable{
    x: number
    y: number
    parent: Drawable
    children : Set<Drawable>

    move (pos: {x: number, y: number}) : void {}
    moveX (distance: number) : void {}
    moveY (distance: number) : void {}
    moveTo (pos: {x: number , y: number}) : void {}

    beforeDraw (ctx: CanvasRenderingContext2D) : void {

    }
    draw (ctx: CanvasRenderingContext2D) : void {

    }
    afterDraw (ctx: CanvasRenderingContext2D) : void {

    }
}