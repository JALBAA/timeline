import {Point} from './lib/Point'
import {Tile} from './lib/Tile'
import {Line} from './lib/Line'

import {Stage} from './lib/Stage'
import { Matrix33, Matrix32 } from './lib/utils/matrix';
import { Vector } from './lib/utils/vector';


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

let m1 = new Matrix33
m1.data[2][0] = 10
m1.data[2][1] = 20
m1.data[0][0] = 10
m1.data[1][1] = 10
console.log(m1.toString())
let v =  new Vector
console.log(v.toString())
v.mutiply(m1)
console.log(v.toString())

let world = new Matrix33
// let 1 = obj
// let 2 = obj
// 1.worldmatrix = world
// 2.worldmatrix = world
// 1.add(2)

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
    line.moveX(10)
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