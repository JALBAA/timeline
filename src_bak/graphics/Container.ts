import RenderableObject, { Styler } from "./RenderableObject";
import { SVGNS } from "../utils/Global";
export default class Container extends RenderableObject {
    node = document.createElementNS(SVGNS, 'g')
    onDraw () {
        this.node.setAttribute('transform', `translate(${this.coord.x}, ${this.coord.y})`)
    }
}