import Line from "./graphics/Line";
import Stage from "./Stage";
import Grid from "./grid";
import Railway from "./graphics/Railway";
import { DebugGrid } from "./utils/Debug";
import { Time, Day, DateToCoord} from "./Time";
import {LineJob, LabourIcon, JobRailway} from "./jobs/RenderableJob";

import Task from './jobs/Task'
import SuperDate from "./SuperDate";
import Container from "./graphics/Container";
import { Row } from "./Table";
import Labour from "./workers/Labour";
import Job from "./jobs/Job";

const tast = new Task


// const l = new Line
const l2 = new Line
const debugGrid = new DebugGrid
const body = document.querySelector('body')
if (body) {
    const stage = new Stage(body, 500, 500)
    stage.addChild(debugGrid)
    const railway = new Railway
    const l = new LineJob()
    const labour = new LabourIcon()
    const partener1 = new LabourIcon()
    const partener2 = new LabourIcon()
    const partener3 = new LabourIcon()
    l.addOwner(labour)
    l.addPartener(partener1)
    l.addPartener(partener2)
    l.addPartener(partener3)
    const l2 = new LineJob()
    const zhaoye = new LabourIcon()
    l2.addOwner(zhaoye)
    const task = new Task()
    task.addChild(l)
    task.addChild(l2)
    stage.addChild(task)
    // const r2 = new Railway
    // const l3 = new Line
    // r2.addChild(l3)
    // r2.translate({
    //     x: new Grid(0),
    //     y: new Grid(2),
    // })
    // l3.width = new Grid(5)
    // r2.height = new Grid(2)
    // stage.addChild(r2)
    // // svg.appendChild(l.node)
    // // svg.appendChild(l2.node)
    // railway.addChild(l)
    // railway.addChild(l2)
    // railway.height = new Grid(2)
    // railway.translate({
    //     y: new Grid(1),
    //     x: new Grid(0),
    // })
    // stage.addChild(railway)
    // // stage.addChild(l)
    // // stage.addChild(l2)
    railway.translate({x: new Grid(0), y: new Grid(2)})
    // l.width = new Grid(5)
    l.devEnd.addDays(10)
    l.devStart.addDays(1)
    l2.devEnd.addDays(3)
    l2.devStart.update(new SuperDate)
    console.log(l)

    
    document.addEventListener('keyup', (e) => {
        if (e.keyCode == 40) {
            railway.translate({
                y: railway.coord.y.add(new Grid(1)),
                x: railway.coord.x,
            })
        } else if (e.keyCode == 38) {
            railway.translate({
                y: railway.coord.y.sub(new Grid(1)),
                x: railway.coord.x,
            })
        }
        if (e.keyCode == 37) {
            l.translate({
                x: l.coord.x.sub(new Grid(1)),
                y: l.coord.y
            })
        } else if (e.keyCode == 39) {
            l.translate({
                x: l.coord.x.add(new Grid(1)),
                y: l.coord.y
            })
        }
        stage.draw()
    })
    // l2.translate({x: new Grid(4), y: new Grid(.5)})
    // l2.width = new Grid(3)
    // stage.draw()
    // setTimeout (() => {
    //     // const coord = l.coord
    //     // l.translate({x: l.coord.x.add(new Grid(1)), y: l.coord.y})
    //     // l.width = l.width.add(new Grid(1))
    //     // l.draw()
    //     l2.width = l2.width.add(new Grid(1))
    //     stage.draw()
    // }, 1600)

    const t = new Time
    t.translate({
        x: t.coord.x,
        y: new Grid(1),
    })
    DateToCoord.globalTime = t
    // t.travelForward()
    stage.addChild(t)
    stage.draw()
    setInterval (() => {
        // t.travelForward()
        // l.translate({x: l.coord.x.add(new Grid(1)), y: l.coord.y})
        // console.log(t.end)
        // l.devStart.addDays(1)
        stage.draw()
    }, 1000)
    const forward = document.querySelector('#forward')
    if (forward) {
        forward.addEventListener('click', e => {
            t.travelForward()
            stage.draw()
        })
    } 
    const backward = document.querySelector('#backward')
    if (backward) {
        backward.addEventListener('click', e => {
            t.travelBackward()
            stage.draw()
        })
    }
}

// forward.

Object.defineProperty(window, 'Grid', {
    value: Grid,
})
var g1 = new Grid(0)
var g2 = new Grid(1)
