import RenderableObject from "./graphics/RenderableObject";

// import Coordinate from "./graphics/Coordinate";
// import Drawable from "./interface/Drawable";
// import Rail from "./graphics/Rail";
// import ICoordinate from "./interface/ICoordinate";

// export default class Stage extends Coordinate implements Drawable {
//     // rails
//     rails: Rail[] = []
//     // template: String = `
//     //     <svg viewBox = "">
            
//     //     </svg>
//     // `
//     // template: String = ''
//     node: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
//     constructor (height: number, width: number) {
//         super()
//         this.node.setAttribute('viewBox', `0 0 ${height} ${width}`)
//         this.node.setAttribute('height', `${height}px`)
//         this.node.setAttribute('width', `${width}px`)
//     }
//     addRail (rail: Rail) {
//         this.rails.push(rail)
//         this.addChild(rail)
//     }
//     removeRail (rail: Rail) {
//         this.rails = this.rails.filter(_rail => _rail.cid != rail.cid)
//         this.setChildren(this.children.filter(_rail => _rail.cid != rail.cid))
//     }
//     draw () {

//     }
// }
const ns = 'http://www.w3.org/2000/svg'

export default class Stage extends RenderableObject {
    node = document.createElementNS(ns, 'svg') as SVGSVGElement
    constructor (container: HTMLElement, width: number, height: number) {
        super()
        container.appendChild(this.node)
        this.node.setAttribute('width', `${width}px`)
        this.node.setAttribute('height', `${height}px`)
        // this.node.setAttribute('viewBox', `0 0 ${width} ${height}`)
    }
}