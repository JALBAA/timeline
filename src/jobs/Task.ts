import Container from "../graphics/Container";
import { Jobable } from "./Job";
import { Renderable, Coord } from "../graphics/RenderableObject";
import Grid from "../grid";


interface Taskable {
    addJob (job: Jobable & Renderable) : void
}

export default class Task extends Container implements Taskable {
    coord: Coord = {
        x: new Grid(0),
        y: new Grid(1),
    }
    addJob (job: Jobable & Renderable) : void {
        this.addChild(job)
    }
    beforeDraw () {
        this.children.forEach((child, idx) => {
            child.translate({
                x: new Grid(0),
                y: new Grid(idx).mul(child.height)
            })
        })
    }
}