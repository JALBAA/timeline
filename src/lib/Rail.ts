import {Position} from './interface/Position'
import { Drawable } from './interface/Drawable'
import { Container } from './Container'
import {Tile} from './Tile'
export class Rail extends Container {
    x: number
    y: number
    parent: Drawable
    children : Set<Drawable>
}