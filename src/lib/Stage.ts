import { Drawable } from './interface/Drawable'
import { Container } from './Container';

class Root extends Container {
    x: number = 0
    y: number = 0
    parent: Drawable = null
    children: Set<Drawable> = new Set
    beforeDraw (ctx: CanvasRenderingContext2D) {
        ctx.save()
    }
    draw (ctx: CanvasRenderingContext2D) {
        this.beforeDraw(ctx)
        this.children.forEach(child => child.draw(ctx))
        this.afterDraw(ctx)
    }
    afterDraw (ctx: CanvasRenderingContext2D) {
        ctx.restore()
    }
    add (child: Drawable) {
        this.children.add(child)
    }
    remove(child: Drawable) {
        this.children.delete(child)
    }
    move (pos: {x: number, y: number}) {}
    moveX (distance: number) {}
    moveY (distance: number) {}
    moveTo (pos: {x: number , y: number}) {}
}

export class Stage {
    private canvas: HTMLCanvasElement
    root: Root
    width: number
    height: number
    cbList: Array<() => void> = []
    constructor ({
        height = 0,
        width = 0
    }) {
        this.height = height
        this.width = width
        this.canvas = document.createElement('canvas')
        this.canvas.height = this.height
        this.canvas.width = this.width
        window.requestAnimationFrame(() => {this.render()})

        this.root = new Root
    }
    getViewport() : HTMLElement {
        return this.canvas
    }
    getContext () : CanvasRenderingContext2D {
        return this.canvas.getContext('2d')
    }
    add (child: Drawable) {
        this.root.children.add(child)
    }
    remove(child: Drawable) {
        this.root.children.delete(child)
    }
    render() {
        this.getContext().clearRect(0, 0, this.width, this.height)
        this.cbList.forEach(cb => cb())
        this.root.draw(this.getContext())
        window.requestAnimationFrame(() => {this.render()})
    }
    onRenderFrame(cb: () => void) {
        this.cbList.push(cb)
    }
}