import Job, { Jobable } from "../jobs/Job";
import RenderableObject, { Renderable } from "../graphics/RenderableObject";
import Grid from "../grid";

export enum Sex {
    Man,
    Woman,
}
export enum LabourType {
    Owner,
    Partener,
}
export interface Labourable {
    jobs: Array <Job & RenderableObject>
    name: string
    type: LabourType
    setLabourType (type: LabourType): void
    addJob (node: Job & RenderableObject) : void
}
export default class Labour implements Labourable {
    // jobs
    jobs: Array <Job & RenderableObject> = []
    name: string = ''
    givenName: string = ''
    familyName: string = ''
    sex: Sex = Sex.Man
    type: LabourType = LabourType.Partener
    addJob (node: Job & RenderableObject) {
        this.jobs.push(node)
    }
    get height () {
        if (this.jobs.length > 0)
            return this.jobs[0].height
        else
            return new Grid(0)
    }
    removeJob () {
        
    }
    setLabourType (type: LabourType) {
        this.type = type
    }
}