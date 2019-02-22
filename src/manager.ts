import {RenderObject, RenderContainer } from "./render";
type Node = RenderObject | RenderContainer
abstract class BaseManager {
    root: Node
    constructor (root: Node) {
        this.root = root
        // window.requestAnimationFrame(() => {
        //     this.renderFrame()
        // })
    }
    // renderFrame () {
    //     window.requestAnimationFrame(() => {
    //         this.renderFrame()
    //     })
    // }
}
export class ComputeManager extends BaseManager {
    computeStyle (node: Node) {
        node.computeStyle()
        if (node.isContainable()) {
            (node as RenderContainer).forEach(child => {
                this.computeStyle(child as RenderObject)
            })
        }
    }
    renderFrame () {
        this.computeStyle(this.root)
        // super.renderFrame()
    }
}
export class DrawManager extends BaseManager {
    draw (node: Node) {
        node.draw()
        if (node.isContainable()) {
            (node as RenderContainer).forEach(child => {
                this.draw(child as RenderObject)
            })
        }
    }
    renderFrame () {
        this.draw(this.root)
    }
}

export class LayoutManager extends BaseManager {
    layout (node: Node) {
        node.layout()
        if (node.isContainable()) {
            (node as RenderContainer).forEach(child => {
                this.layout(child as RenderObject)
            })
        }
    }
    renderFrame () {
        this.layout(this.root)
    }
}
export class Manager {
    ctx?: CanvasRenderingContext2D
    compute?: ComputeManager
    draw?: DrawManager
    layout?: LayoutManager
    root?: Node
    constructor (ctx?: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
    manage (root: Node) {
        this.root = root
        this.compute = new ComputeManager(root)
        this.layout = new LayoutManager(root)
        this.draw = new DrawManager(root)
        window.requestAnimationFrame(() => {
            this.renderFrame()
        })
    }
    renderFrame () {
        if (this.root) {
            this.ctx && this.ctx.clearRect(0, 0, this.root.width.value, this.root.height.value)
        }
        this.ctx && this.ctx.save()
        this.compute && this.compute.renderFrame()
        this.layout && this.layout.renderFrame()
        this.draw && this.draw.renderFrame()
        window.requestAnimationFrame(() => {
            // this.renderFrame()
        })
        this.ctx && this.ctx.restore()
    }
}