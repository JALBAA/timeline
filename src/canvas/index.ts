import { FlexItem, FlexContainer, ObjectCons, FlexContainerCons } from "../render";
interface Context {
    ctx: CanvasRenderingContext2D
}
interface CanvasElementCons extends ObjectCons {
    ctx: CanvasRenderingContext2D
}
function color16(){//十六进制颜色随机
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
    return color;
}
export class CanvasElement extends FlexItem implements Context {
    ctx: CanvasRenderingContext2D
    constructor (cons: CanvasElementCons ) {
        super(cons)
        this.ctx = cons.ctx
    }
    draw () {
        this.ctx.fillStyle = color16()
        this.ctx.beginPath()
        this.ctx.moveTo(this.globalX, this.globalY)
        this.ctx.lineTo(this.globalX + this.computedWidth.value, this.globalY)
        this.ctx.lineTo(this.globalX + this.computedWidth.value, this.globalY + this.computedHeight.value)
        this.ctx.lineTo(this.globalX, this.globalY + this.computedHeight.value)
        this.ctx.lineTo(this.globalX, this.globalY)
        this.ctx.stroke()
        this.ctx.closePath()
        this.ctx.fillRect(this.globalX, this.globalY, this.computedWidth.value, this.computedHeight.value)
    }
}
interface CanvasContainerCons extends FlexContainerCons {
    ctx: CanvasRenderingContext2D
}
class CanvasContainer extends FlexContainer {
    ctx: CanvasRenderingContext2D
    constructor (cons: CanvasElementCons ) {
        super(cons)
        this.ctx = cons.ctx
    }
    draw () {

    }
}