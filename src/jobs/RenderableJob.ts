import Job from "./Job"
import {JobStatus, JobType, Schedule} from './Job'
import Labour from "../workers/Labour"
import RenderableObject from "../graphics/RenderableObject";
import Line from "../graphics/Line";
import Stage from "../Stage";
import {IRenderableObject, Coord} from  "../graphics/RenderableObject";
import Grid from "../grid";

class RenderableJob {
   job = new Job('', '')
   view: RenderableObject | null = null
}


export default class LineJob extends RenderableJob implements IRenderableObject{
    view: Line = new Line
    constructor (title: string, info: string) {
        super()
        this.job.title = title
        this.job.info = info
    }
    addParent (parent: RenderableObject) {
        this.view.addParent(parent)
    }
    removeParent () {
        this.view.removeParent()
    }
    addChild (child: RenderableObject) {
        this.view.addChild(child)
    }
    removeChild (target: RenderableObject) {
        this.view.removeChild(target)
    }
    removeAll () {
        this.view.removeAll()
    }
    getWorldPos (): Coord {
        return this.view.getWorldPos()
    }
    translate (coord: Coord) {
        this.view.translate(coord)
    }
    draw () {
        this.view.draw()
    }
}

class IconJob {

}