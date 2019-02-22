import { Manager } from "./manager";
import { RenderContainer, RenderObject, RootContainer, FlexContainer, FlexItem } from "./render";
import { Unit, UnitType } from "./render/style";
import {CanvasElement} from './canvas'

// import { Stage, TextElement, CircleElement } from "./objects/RenderObject";
// import { RenderContainer, RenderElement, FlexLayoutContainer, AbsoluteLayoutContainer } from "./graphics/Render";
// import { Grid } from "./Grid";
// 样式布局、实体关系、数据关联

// const stage = new Stage('#app', 500, 400)

// // const table = new RenderContainer

// const bbaa = new CircleElement({
//     id: 'cc',
//     drawAttr: {
//         borderWidth: 1,
//         borderColor: '#ff3030',
//     },
//     layoutAttr: {
//         width: 100,
//         height: 100,
//     }
// })
// console.log(bbaa)
// const a = new RenderContainer ({
//     id: 'aaa',
//     children: [new TextElement({
//         id: 'ac',
//         text: '123',
//     }), bbaa]
// })

// const b = new FlexLayoutContainer({
//     id: 'ffe',
//     layoutAttr: {
//         width: 100,
//         height: 200,
//     }
// })
// const c = new AbsoluteLayoutContainer({
//     id: 'ab',
//     children: [
//         new TextElement({
//             id: 'bbbaaa',
//             text: '1233',
//         })
//     ],
// })
// console.log(b, c)
// console.log(a.id, a.children[0].id)
// a.coord.x = new Grid(1)
// a.coord.y = new Grid(1)
// console.log(a.coord)

// stage.addChild(a)
const aaa = `
    container: flexLayout, absoluteLayout

`

const Child2Style = {}
console.log(new Unit(500))
const c = document.getElementById('canvas')  as HTMLCanvasElement
if (c) {
    const ctx = c.getContext('2d') as CanvasRenderingContext2D
    const a = new FlexContainer ({
        id: 'child2.container',
        flex: 1,
        children: [
            new CanvasElement ({
                class: 'tt',
                ctx,
            }),
            new CanvasElement ({
                class: 'tt',
                ctx,
            }),
            new CanvasElement ({
                class: 'tt',
                ctx,
            }),
            new CanvasElement ({
                class: 'tt',
                ctx,
            }),
        ],
    })
    const b = new CanvasElement ({
        id: 'child1',
        ctx,
        height: new Unit(50),
        // width: new Unit(120),
    })
    const root = new RootContainer({
        id: 'root',
        width: new Unit(500),
        height: new Unit(500),
        children: [
            b,
            a,
            new CanvasElement ({
                id: 'child33',
                ctx,
            }),
        ],
    })
    setTimeout(() => {
        a.flex = 2
    }, 1000)
    
    setTimeout(() => {
        a.height = new Unit(50)
        a.width = new Unit(150)
    }, 2000)
    const manager = new Manager(ctx)
    manager.manage(root)
    console.log(root)
}

// console.log(a)

