import Job, { Jobable, Scheduleable } from "./Job"
import {JobStatus, JobType, Schedule} from './Job'
import Labour, { Labourable, LabourType } from "../workers/Labour"
import Line from "../graphics/Line";
import Stage from "../Stage";
import RenderableObject, { Styler } from  "../graphics/RenderableObject"
import {Renderable, Coord} from  "../graphics/RenderableObject"
import Grid from "../grid";
import Railway from "../graphics/Railway";
import Container from "../graphics/Container";
import SuperDate from "../SuperDate";
import { DateToCoord } from "../Time";
export default class RenderableJob {
   job = new Job('', '')
   view: Renderable | null = null
}
class Text extends RenderableObject {
    node: SVGTextElement = document.createElementNS(ns, 'text')
    textContent: String = ''
    onDraw () {
        this.node.textContent = this.textContent
    }
}
export class Icon extends RenderableObject {
    node: SVGCircleElement = document.createElementNS(ns, 'circle')
    get width () {
        // this.width == this.height, they are all refer to radius
        return this.height
    }
    set width (val: Grid) {
        this.height = val
    }
    constructor () {
        super()
        this.height = new Grid(.5)
    }
    onDraw () {
        this.node.setAttribute('cx', this.coord.x.add(this.height).toString())
        this.node.setAttribute('cy', this.coord.y.add(this.height).toString())
        this.node.setAttribute('r', (this.height.value).toString())
    }
}

export class LabourIcon extends Container implements Labourable {
    labour: Labour = new Labour
    jobs: Array <Job & RenderableObject> = []
    name: string = ""
    icon: Icon = new Icon
    text: Text = new Text
    constructor () {
        super()
        this.addChild(this.icon)
        this.addChild(this.text)
    }
    get type () {
        return this.labour.type
    }
    setLabourType (type: LabourType) {
        this.labour.setLabourType(type)
    }
    addJob (node: Job & RenderableObject) {
        this.jobs.push(node)
    }
    onDraw () {
        super.onDraw()
        if (this.type == LabourType.Owner) {
            this.node.setAttribute('style', 'stroke:black;stroke-width:2;fill:yellow')
        } else {
            this.node.setAttribute('style', 'stroke:black;stroke-width:2;fill:pink')
        }
    }
}


const ns = 'http://www.w3.org/2000/svg'


export class LineJob extends Line implements Jobable, Scheduleable {
    job: Job = new Job('', '')
    labours: Array<Labourable & Renderable> = []
    // height: Grid = new Grid(1)
    private _height: Grid = new Grid(1)
    set height (val: Grid) {
        this._height = val
    }
    get height () : Grid {
        return this._height
    }
    set devStart (date: SuperDate) {
        this.job.devStart = date
    }
    set devEnd (date: SuperDate) {
        if (date.isBefore(this.devStart)) throw new Error('结束日期不能超过开始日期')
        this.job.devEnd = date
    }
    get devStart () {
        return this.job.devStart
    }
    get devEnd () {
        return this.job.devEnd
    }
    get testStart () {
        return this.job.testStart
    }
    get testEnd () {
        return this.job.testEnd
    }
    get release () {
        return this.job.release
    }
    get integrationStart () {
        return this.job.integrationStart
    }
    get integrationEnd () {
        return this.job.integrationEnd
    }
    get finished () {
        return this.job.finished
    }
    addOwner (owner: Labourable & Renderable) {
        this.job.addOwner(owner)
        this.labours[0] = owner
        this.addChild(owner)
    }
    addPartener (partener: Labourable & Renderable) {
        if (this.labours.length == 0) throw new Error('必须有onwer')
        if (this.labours.filter(labour => {
            if (labour == partener) {
                return true
            }
        }).length > 0) {
            throw new Error ('不能重复添加')
        }
        this.job.addPartener(partener)
        this.labours.push(partener)
        this.addChild(partener)
        this.height = new Grid(2)
    }
    onDraw () {
        const startPos = DateToCoord.fromDateToCoord(this.devStart)
        this.width = new Grid(this.devStart.daysBetween2Date(this.devEnd))
        this.translate({
            x: new Grid(startPos),
            y: this.coord.y,
        })
        this.labours.forEach((labour, idx) => {
            labour.translate({
                x: (new Grid(idx)).add(labour.width).sub(labour.width),
                y: new Grid(1),
            })
        })
        super.onDraw()
    }
}

export class JobRailway extends Railway {
    jobs: Array<Jobable & Renderable> = []
    addJob (job: Jobable & Renderable) {
        this.jobs.push(job)
        this.railway.addChild(job)
    }
}

// export class LineJob extends Container {
//     // jobs: Job[],
//     // labours: Labour[],
//     node: SVGGElement = document.createElementNS(ns, 'g')
//     railway: Railway = new Railway
//     jobs: JobLine[] = []

//     get width () {
//         return this.railway.width
//     }
//     set width (val: Grid) {
//         this.width = val
//         this.railway.width = val
//     }
//     constructor () {
//         super()
//         this.railway.translate({
//             x: new Grid(0),
//             y: new Grid(1),
//         })
//         this.height = new Grid(4)
//     }
//     _draw () {
//         this.node.setAttribute('cx', this.coord.x.toString())
//         this.node.setAttribute('cy', this.coord.y.toString())
//         this.node.setAttribute('r', (this.height.value).toString())
//     }
// }

// export class LineJob extends RenderableJob implements Renderable {
//     set coord (val: Coord) {
//         this.view.coord = val
//     }
//     get coord () {
//         return this.view.coord
//     }
//     set height (val: Grid) {
//         this.view.height = val
//     }
//     get height () {
//         return this.view.height
//     }
//     set width (val: Grid) {
//         this.view.height = val
//     }
//     get width () {
//         return this.view.height
//     }
//     view: Line = new Line
//     constructor (title: string, info: string) {
//         super()
//         this.job.title = title
//         this.job.info = info
//     }
//     addParent (parent: RenderableObject) {
//         this.view.addParent(parent)
//     }
//     removeParent () {
//         this.view.removeParent()
//     }
//     addChild (child: RenderableObject) {
//         this.view.addChild(child)
//     }
//     removeChild (target: RenderableObject) {
//         this.view.removeChild(target)
//     }
//     removeAll () {
//         this.view.removeAll()
//     }
//     getWorldPos (): Coord {
//         return this.view.getWorldPos()
//     }
//     translate (coord: Coord) {
//         this.view.translate(coord)
//     }
//     draw () {
//         this.view.draw()
//     }
// }

// class IconJob {

// }