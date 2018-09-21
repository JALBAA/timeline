import Line from "./graphics/Line";
import Stage from "./Stage";
import Grid from "./grid";
import Railway from "./graphics/Railway";
import { DebugGrid } from "./utils/Debug";
import { Time, Day } from "./Time";
const l = new Line
const l2 = new Line
const debugGrid = new DebugGrid
const body = document.querySelector('body')
if (body) {
    const stage = new Stage(body, 500, 500)
    stage.addChild(debugGrid)
    const railway = new Railway
    const r2 = new Railway
    const l3 = new Line
    r2.addChild(l3)
    r2.translate({
        x: new Grid(0),
        y: new Grid(2),
    })
    l3.width = new Grid(5)
    r2.height = new Grid(2)
    stage.addChild(r2)
    // svg.appendChild(l.node)
    // svg.appendChild(l2.node)
    railway.addChild(l)
    railway.addChild(l2)
    railway.height = new Grid(2)
    railway.translate({
        y: new Grid(1),
        x: new Grid(0),
    })
    stage.addChild(railway)
    // stage.addChild(l)
    // stage.addChild(l2)
    l.translate({x: new Grid(1), y: new Grid(.5)})
    l.width = new Grid(2)
    l2.translate({x: new Grid(4), y: new Grid(.5)})
    l2.width = new Grid(3)
    stage.draw()
    setTimeout (() => {
        // const coord = l.coord
        // l.translate({x: l.coord.x.add(new Grid(1)), y: l.coord.y})
        // l.width = l.width.add(new Grid(1))
        // l.draw()
        l2.width = l2.width.add(new Grid(1))
        stage.draw()
    }, 1600)

    const t = new Time
    console.log(t)
    t.view.translate({
        x: t.view.coord.x,
        y: new Grid(1),
    })
    // t.travelForward()
    stage.addChild(t.view)
    console.log(t.view)
    stage.draw()
    // setInterval (() => {
    //     t.travelForward()
    //     // console.log(t.end)
    //     stage.draw()
    // }, 1000)
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