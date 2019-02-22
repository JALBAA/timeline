import { IJob } from "./job";
import { RenderElement, RenderContainer } from "../graphics/Render";
import { SVGNS } from "../util";

export interface ILabour {
    // name: string
    jobs: IJob[]
    addJob (job: IJob) : void
    removeJob (job: IJob) : void
}

class LabourName extends RenderElement {
    node: SVGTextElement = document.createElementNS(SVGNS, 'text')
}
class LabourIcon extends RenderElement {
    node: SVGCircleElement = document.createElementNS(SVGNS, 'circle')
}
export class Labour extends RenderContainer {
    // name: string = ''
    name: LabourName = new LabourName
    icon: LabourIcon = new LabourIcon
    constructor () {
        super()
        this.addChild(this.name)
        this.addChild(this.icon)
    }
}
export class Owner extends Labour {

}
export class Partener extends Labour {
    
}

export class JobLine extends RenderElement {
    node: SVGLineElement = document.createElementNS(SVGNS, 'line')
}
export class JobHandle extends RenderElement {
    node: SVGCircleElement = document.createElementNS(SVGNS, 'circle')
}
export class Task extends RenderContainer {
    job: Job = new Job
    constructor () {
        super()
        this.addChild(this.job)
    }
}
export class Job extends RenderContainer {
    leftHandle: JobHandle = new JobHandle
    rightHandle: JobHandle = new JobHandle
    line: JobLine = new JobLine
    constructor () {
        super()
        this.addChild(this.leftHandle)
        this.addChild(this.line)
        this.addChild(this.rightHandle)
    }
}


class CircleElement extends RenderElement {
    node: SVGCircleElement = document.createElementNS(SVGNS, 'circle')
}
class TextElement extends RenderElement {
    node: SVGTextElement = document.createElementNS(SVGNS, 'text')
}

class IconElement extends RenderContainer {
    children = [new CircleElement, new TextElement]
}

const labour = new IconElement
// const table = new RenderContainer({
//     children: [
//         labour,
//     ],
// })