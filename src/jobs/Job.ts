import {Labourable, LabourType} from "../workers/Labour"
import SuperDate from "../SuperDate";
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

export interface Jobable {
    addOwner (owner: Labourable): void
    addPartener (partener: Labourable): void
}

export interface Scheduleable {
    devStart: SuperDate
    devEnd: SuperDate
    testStart: SuperDate
    testEnd: SuperDate
    release: SuperDate
    integrationStart: SuperDate
    integrationEnd: SuperDate
    finished: SuperDate
}

export class Schedule implements Scheduleable {
    devStart: SuperDate = new SuperDate
    devEnd: SuperDate = new SuperDate
    testStart: SuperDate = new SuperDate
    testEnd: SuperDate = new SuperDate
    release: SuperDate = new SuperDate
    integrationStart: SuperDate = new SuperDate
    integrationEnd: SuperDate = new SuperDate
    finished: SuperDate = new SuperDate
}

export default class Job implements Jobable, Scheduleable {
    status: JobStatus = JobStatus.None
    schedule: Schedule = new Schedule
    type: JobType = JobType.Default
    title = ''
    info = ''
    set devStart (date: SuperDate) {
        this.schedule.devStart = date
    }
    set devEnd (date: SuperDate) {
        if (date.isBefore(this.devStart)) throw new Error('结束日期不能超过开始日期')
        this.schedule.devEnd = date
    }
    set testStart (date: SuperDate) {
    }
    set testEnd (date: SuperDate) {
    }
    set release (date: SuperDate) {
    }
    set integrationStart (date: SuperDate) {
    }
    set integrationEnd (date: SuperDate) {
    }
    set finished (date: SuperDate) {
    }
    get devStart () {
        return this.schedule.devStart
    }
    get devEnd () {
        return this.schedule.devEnd
    }
    get testStart () {
        return this.schedule.testStart
    }
    get testEnd () {
        return this.schedule.testEnd
    }
    get release () {
        return this.schedule.release
    }
    get integrationStart () {
        return this.schedule.integrationStart
    }
    get integrationEnd () {
        return this.schedule.integrationEnd
    }
    get finished () {
        return this.schedule.finished
    }
    constructor (title: string, info: string, start?: SuperDate, end?: SuperDate) {
        if (!start) this.devStart = new SuperDate
        this.initSchedule(start, end)
    }
    initSchedule (start?: SuperDate, end?: SuperDate) {
        if (start) {
            this.devStart = start
        }
        if (end) {
            this.devEnd = end
        } else {
            this.devEnd.update(this.devStart).addDays(1)
        }
    }

    // owner: Owner | null = null
    
    // partener: Partener[] | null = null


    addOwner (owner: Labourable) {
        owner.setLabourType(LabourType.Owner)
    }

    addPartener (partener: Labourable) {
        partener.setLabourType(LabourType.Partener)
    }
}