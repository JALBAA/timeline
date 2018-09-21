import Job from "./Job"
import {JobStatus, JobType, Schedule} from './Job'
import Labour from "../workers/Labour"
import RenderableObject from "../graphics/RenderableObject";
import Line from "../graphics/Line";
import Stage from "../Stage";

export default class RenderableJob {
   job = new Job('', '')
   view: RenderableObject | null = null
}

class LineJob extends RenderableJob {
    view: Line = new Line
    constructor (title: string, info: string) {
        super()
        this.job.title = title
        this.job.info = info
    }
}

class IconJob {

}