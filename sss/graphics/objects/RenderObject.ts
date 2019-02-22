import { RenderContainer, SVGRenderObject, ElementConstructor, ContainerConstructor } from "../graphics/Render";
import { SVGNS } from "../util";
import { Manager } from "../manager";

export class Stage extends RenderContainer {
    manager: Manager
    node: SVGSVGElement = document.createElementNS(SVGNS, 'svg')
    constructor (selector: string, height: number, width: number) {
        super()
        this.manager = new Manager(this)
        const el = document.querySelector(selector)
        if (el) {
            this.node.setAttribute('height', height.toString())
            this.node.setAttribute('width', width.toString())
            el.appendChild(this.node)
        }
    }
}
interface TextElementCons extends ElementConstructor {
    text: string
}
export class TextElement extends SVGRenderObject {
    node: SVGTextElement = document.createElementNS(SVGNS, 'text')
    constructor (cons: TextElementCons = {
        text: ''
    }) {
        super (cons)
        if (cons.type && cons.type != 'text') {
            throw new Error('this should be only text svg element')
        }
        this.node.textContent = cons.text
    }
}
export class CircleElement extends SVGRenderObject {
    node: SVGCircleElement = document.createElementNS(SVGNS, 'circle')
    constructor (cons?: ElementConstructor) {
        super (cons)
        if (cons && cons.type && cons.type != 'circle') {
            throw new Error('this should be only circle svg element')
        }
    }
    layout () {
        this.layoutAttr.width && this.node.setAttribute('r', this.layoutAttr.width.toString())
    }
    draw () {
        this.drawAttr.borderWidth && this.node.setAttribute('stroke-width', this.drawAttr.borderWidth.toString())
        this.drawAttr.borderColor && this.node.setAttribute('stroke-color', this.drawAttr.borderColor.toString())
    }
}

export class IconElement extends RenderContainer {
    constructor (cons?: ContainerConstructor) {
        super (cons)
    }
}