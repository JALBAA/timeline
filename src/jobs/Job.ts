import Labour from "../workers/Labour";

export enum JobStatus {
    None,
    Done,
    Doing,
    Pending,
    Pause,
    Timeout,
}
export enum JobType {
    None,
    Default,
}
// import Position from '../docorators/Position'
// @Position({
//     x: 0,
//     y: 0
// })
export class Schedule {
    developStart: Date = new Date
    developEnd: Date = new Date
    testStart: Date = new Date
    testEnd: Date = new Date
    release: Date = new Date
    integrationStart: Date = new Date
    integrationEnd: Date = new Date
    finished: Date = new Date
}

export default class Job {
    status: JobStatus = JobStatus.None
    schedule: Schedule = new Schedule
    type: JobType = JobType.Default
    title = ''
    info = ''

    constructor (title: string, info: string) {
        this.initSchedule()
    }
    initSchedule () {
        function dateAdd1Day (date: Date) : Date {
            return new Date (date.getTime() + 1000 * 60 * 60 * 24)
        }
        this.schedule.developStart = new Date()
        this.schedule.developEnd = dateAdd1Day(this.schedule.developStart)
        this.schedule.testStart = dateAdd1Day(this.schedule.developEnd)
        this.schedule.testEnd = dateAdd1Day(this.schedule.testStart)
        this.schedule.release = dateAdd1Day(this.schedule.testEnd)
        this.schedule.integrationStart = dateAdd1Day(this.schedule.release)
        this.schedule.integrationEnd = dateAdd1Day(this.schedule.integrationStart)
        this.schedule.finished = dateAdd1Day(this.schedule.integrationEnd)
    }

    // owner: Owner | null = null
    
    // partener: Partener[] | null = null


    addOwner (owner: Labour) {

    }

    addPartener (partener: Labour) {

    }
}