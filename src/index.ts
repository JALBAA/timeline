import {Point} from './lib/Point'
import {Tile} from './lib/Tile'
import {Line} from './lib/Line'

import {Stage} from './lib/Stage'

const stage = new Stage({
    width: 1000,
    height: 700,
})

document.body.appendChild(stage.getViewport())

const tile = new Tile

const tile2 = new Tile

const line = new Line

stage.add(line)
stage.add(tile)

let angle = 0
let i = 5
let direction = 1
stage.render()
line.grow()
line.grow()
line.grow()
line.grow()
line.grow()
line.grow()
line.grow()
line.grow()
stage.onRenderFrame(() => {
    angle += 10
    const radian = Math.PI / 180 * angle
    const x = 100 * Math.cos(radian) + 100
    const y = 100 * Math.sin(radian) + 100
    // if (direction == 1) {
    //     i++
    //     if (i == 10) {
    //         direction = 0
    //     }
    //     line.grow()
    // }
    line.moveX(1)
    // if (direction == 0) {
    //     i--
    //     if (i == 0) {
    //         direction = 1
    //     }
    //     line.shrink()
    // }
    tile.moveTo(new Point({
        x,
        y,
    }))
    tile2.moveTo({
        x: x + 200,
        y: y + 200,
    })
})
