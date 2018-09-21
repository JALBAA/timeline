import RenderableObject, { Coord } from "./graphics/RenderableObject";
import Grid from "./grid";
import Container from "./graphics/Container";
const ns = 'http://www.w3.org/2000/svg'

// class Timeline extends RenderableObject{
//     addChild (child: Day) {
//         super.addChild(child)
//     }
//     removeChild (child: Day) {
//         super.removeChild(child)
//     }
//     constructor () {
//         super()
//     }
//     forward () {

//     }
//     backward () {

//     }
// }
class DayTileBG extends RenderableObject {
    node: SVGRectElement = document.createElementNS(ns, 'rect')
    oddOrEven = 'even'
    constructor () {
        super()
        if (this._cid % 2 != 0) {
            this.oddOrEven = 'odd'
        }
    }
    _draw () {
        const newY = (this.coord.y.sub(this.height))
        if (this.oddOrEven == 'even') {
            this.node.setAttribute('style', 'stroke-width: .5;stroke: gray;fill: rgba(255,255,255,1);')
        } else {
            this.node.setAttribute('style', 'stroke-width: .5;stroke: gray;fill: rgba(200,200,200,1);')
        }
        this.node.setAttribute('x', this.coord.x.toString())
        this.node.setAttribute('y', newY.toString())
        this.node.setAttribute('width', this.width.toString())
        this.node.setAttribute('height', this.height.toString())
    }
}
class DayText extends RenderableObject {
    node: SVGTextElement = document.createElementNS(ns, 'text')
    _draw () {
        const newY = this.coord.y.sub(new Grid(.3))
        const newX = this.coord.x.add(new Grid(.2))
        this.node.setAttribute('font-size', '12px')
        this.node.setAttribute('x', newX.toString())
        this.node.setAttribute('y', newY.toString())
    }
}
class DayTile extends Container {
    // node: SVGTextElement = document.createElementNS(ns, 'text')
    day: Day | null = null
    bg: DayTileBG = new DayTileBG
    text: DayText = new DayText
    constructor (day: Day | null) {
        super()
        this.addChild(this.bg)
        this.addChild(this.text)
        this.text.translate(this.coord)
        this.bg.translate(this.coord)
        if (day) {
            this.day = day
        }
    }
    _draw () {
        super._draw()
        // this.node.setAttribute('font-size', '12px')
        // this.node.setAttribute('x', this.coord.x.value.toString())
        // this.node.setAttribute('y', this.coord.y.value.toString())
        // const d =  this.day ? (this.day.date.getDate().toString()) : ''
        // this.node.innerHTML = this.day ? d : 'no date'
        // this.text.node.setAttribute('font-size', '12px')
        // this.text.node.setAttribute('x', this.coord.x.value.toString())
        // this.text.node.setAttribute('y', this.coord.y.value.toString())
        const d =  this.day ? (this.day.date.getDate().toString()) : ''

        this.text.node.innerHTML = this.day ? d : 'no date'
    }
}

class MonthTile extends RenderableObject {
    node: SVGGElement = document.createElementNS(ns, 'g')
}

export class TimeRuler extends Container {
    addChild (child: DayTile) {
        super.addChild(child)
    }
    removeChild (child: DayTile) {
        super.removeChild(child)
    }
    updateData (days: Day[], pivotPos: number) {
        this.removeAll()
        days.forEach((day, index) => {
            const tile = new DayTile(day)
            tile.translate({
                x: new Grid(index - pivotPos),
                y: new Grid(0),//new Grid(this.coord.y),
            })
            this.addChild(tile)
        })
    }
}

export class Day  {
    // node: SVGTextElement = document.createElementNS(ns, 'text')
    date = new Date
    constructor (d: Day | Date | null) {
        if (d) {
            this.date = new Date(d.getTime())
        }
    }
    addDayByNumber (d: number): Day {
        return new Day(new Date(this.date.getTime() + d * 1000 * 60 * 60 * 24))
    }
    subDayByNumber (d: number): Day {
        return new Day(new Date(this.date.getTime() - d * 1000 * 60 * 60 * 24))
    }
    forward () {
        this.date = new Date(this.date.getTime() + 1000 * 60 * 60 * 24)
    }
    backward () {
        this.date = new Date(this.date.getTime() - 1000 * 60 * 60 * 24)
    }
    getTime () {
        return this.date.getTime()
    }
}

export class Time {
    days: Day[] = []
    view: TimeRuler = new TimeRuler
    end: Day | null = null
    start: Day | null = null
    pivot: Day = new Day(new Date)
    pivotPos = 5
    dayLength = 30
    constructor (d: Day | Date | null = null) {
        if (d) {
            if (d instanceof Day) {
                this.pivot = d
            } else if (d instanceof Date) {
                this.pivot = new Day(d)
            }
        }
        this.end = this.pivot.subDayByNumber(this.pivotPos)
        this.start = this.pivot.addDayByNumber(this.dayLength - this.pivotPos)
        this.updateDays()
    }
    updateDays () {
        if (this.end && this.start) {
            let pointer = new Day(new Date(this.end.date.getTime() ))
            this.days = []
            while (pointer.getTime() < this.start.getTime()) {
                this.days.push(new Day(pointer))
                pointer = pointer.addDayByNumber(1)
            }
        }
        this.view.updateData(this.days, this.pivotPos)
    }
    travelForward () {
        this.pivot = this.pivot.addDayByNumber(1)
        this.end = this.pivot.subDayByNumber(this.pivotPos)
        this.start = this.pivot.addDayByNumber(this.dayLength - this.pivotPos)
        this.updateDays()
        // this.days.shift()
        // if (this.end)
        //     this.days.push(this.end)
    }
    travelBackward () {
        this.pivot = this.pivot.addDayByNumber(-1)
        this.end = this.pivot.subDayByNumber(this.pivotPos)
        this.start = this.pivot.addDayByNumber(this.dayLength - this.pivotPos)
        this.updateDays()
        // this.days.pop()
        // if (this.start)
        //     this.days.unshift(this.start)
    }
}
