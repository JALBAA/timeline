import {Serializable} from './interface/Serializable'
import {Position} from './interface/Position'
import { Vector } from './utils/vector';
export class Point implements Serializable, Position{
    x: number = 0
    y: number = 0
    pos: Vector
    constructor (pos?: {x: number, y: number}) {
        if (pos) {
            const {x, y} = pos
            this.init({x, y})
        }
    }
    init ({x, y} = {x: 0, y : 0}) {
        this.x = x
        this.y = y
    }
    toObject () : {x: number, y: number} {
        return {
            x: this.x,
            y: this.y,
        }
    }
    toString () : string {
        return `x: ${this.x}, y:${this.y}`
    }
    move (pos: {x: number, y: number}) : void{}
    moveX (distance: number) : void{}
    moveY (distance: number) : void{}
    moveTo (pos: {x: number , y: number}) : void{}
    transform () : void {
        
    }
}