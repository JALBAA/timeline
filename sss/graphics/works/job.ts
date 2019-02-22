import { ILabour } from "./works";

export enum JobStatus {
    Prepare,
    Ready,
    Working,
    Done,
    Debuging,
    Testing,
    Archived,
}
export interface IJob {
    start: Date
    end: Date
    status: JobStatus
    addPartener (partener: ILabour) : void
}