export interface Position {
    x: number
    y: number
    move (pos: {x: number, y: number}) : void
    moveX (distance: number) : void
    moveY (distance: number) : void
    moveTo (pos: {x: number , y: number}) : void
}