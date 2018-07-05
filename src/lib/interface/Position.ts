import { Vector } from "../utils/vector";
import { Matrix33 } from "../utils/matrix";

export interface Position {
    x: number
    y: number
    pos: Vector
    move (pos: {x: number, y: number}) : void
    moveX (distance: number) : void
    moveY (distance: number) : void
    moveTo (pos: {x: number , y: number}) : void
    transform(matrix: Matrix33): void
}