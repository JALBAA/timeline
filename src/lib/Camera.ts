import {Position} from './interface/Position'
export class Camera implements Position{
    x: number
    y: number
    private viewport: CanvasRenderingContext2D
    moveX (distance: number) {
        this.move({
            x: distance,
            y: this.y,
        })
    }
    moveY (distance: number) {
        this.move({
            x: this.x,
            y: distance,
        })
    }
    move (pos : {x: number, y: number}) {
        const {x, y} = pos
        this.x = x
        this.y = y
        this.viewport.translate(x, y)
    }
    moveTo (pos: {x: number, y: number}) {
        
    }
}