import { Grid } from "../Grid";
import { SVGNS } from "../util";
let cid = 0
export interface IDraw {
    draw () : void
}
export interface ILayout {
    layout () : void
}

export interface IRenderable {
    parent: IContainable | null
    computStyle() : void
    destroy () : void
    removeFromParent () : void
}
export type IDrawOrILayout = (ILayout & IDraw & (IRenderable | IContainable))
export interface IContainable extends IRenderable {
    children: IDrawOrILayout[]
    removeChild (child: IRenderable) : void
    addChild (child: IRenderable) : void
}


export interface RenderNode {
    node: SVGElement | null
}
interface Element {}

export class Coord {
    x: number = 0
    y: number = 0
}

export type RenderConstructor = {
    id?: string,
    layoutAttr?: LayoutAttr,
    drawAttr?: DrawAttr,
}

enum LayoutType {
    Flex = 'flex',
    Absolute = 'absolute',
}

export type LayoutAttr = {
    width?: number,
    height?: number,
    flex?: number,
    coord?: Coord,
}

function createDefaultLayoutAttr () : LayoutAttr {
    return {
        width: 0,
        height: 0,
        coord: new Coord,
        flex: 1,
    }
}
export type DrawAttr = {
    fontSize?: number,
    color?: string,
    backgroundColor?: string,
    borderColor?: string,
    borderWidth?: number,
    borderStyle?: string,
}

function createDefaultDrawAttr () : DrawAttr {
    return {
        fontSize: 12,
        color: '#ffffff',
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 0,
        borderStyle: '',
    }
}

interface ContainerLayoutAttr extends LayoutAttr {
    type: LayoutType,
}
// interface ElementLayoutAttr extends LayoutAttr {}


export abstract class RenderObject implements IRenderable, IDraw, ILayout {
    protected _parent: RenderContainer | null = null
    protected _cid: number = 0
    protected _id: string = ''
    style: {layout: LayoutAttr, draw: DrawAttr} = {
        layout: createDefaultLayoutAttr(),
        draw: createDefaultDrawAttr(),
    }
    computedStyle: {layout: LayoutAttr, draw: DrawAttr} | null = null
    layoutAttr : LayoutAttr = createDefaultLayoutAttr()
    drawAttr: DrawAttr = createDefaultDrawAttr()
    get id () {
        return this._id
    }
    get cid () {
        return this._cid
    }
    get parent () {
        return this._parent
    }
    constructor (cons?: RenderConstructor) {
        this._cid = cid + 1
        if (cons) {
            if (cons.id) {
                this._id = cons.id
            }
        }
    }
    destroy () {
        this.removeFromParent()
    }
    layout () {}
    draw () {}
    computStyle () {
        if (this.parent) {
            console.log(this.parent.style)
        }
    }
    removeFromParent () {
        if (this._parent)
            this._parent.removeChild(this)
        this._parent = null
    }
}

export interface ContainerConstructor extends RenderConstructor {
    children?: (RenderContainer | RenderElement)[],
}

export abstract class RenderContainer extends RenderObject implements IContainable {
    private _children: RenderObject[] = []
    constructor (cons?: ContainerConstructor) {
        super(cons)
        if (cons && cons.children) {
            cons.children.forEach(child => {
                this.addChild(child)
            })
        }
    }
    get children () {
        return this._children
    }
    addChild (child: RenderObject) {
        this._children.push(child)
    }
    destroy () {
        this._children.forEach(child => child.destroy())
        this._children = []
        this.removeFromParent()
    }
    draw () {}
    removeChild (child: RenderObject | (RenderObject)) {
        let idx = 0
        for (let i = 0; i < this._children.length; i++) {
            if (this._children[i].cid == child.cid) {
                idx = i
                break
            }
        }
        this._children.splice(idx, 1)
    }
}

export class SVGRenderContainer extends RenderContainer implements RenderNode {
    node: SVGGElement = document.createElementNS(SVGNS, 'g')
    addChild (child: RenderObject & RenderNode) {
        super.addChild(child)
        if (child.node)
            this.node.appendChild(child.node)
    }
    removeChild (child: RenderObject & RenderNode) {
        super.removeChild(child)
        if (child.node) {
            child.node.parentNode && child.node.parentNode.removeChild(child.node)
            child.node = null
        }
    }
    removeFromParent () {
        super.removeFromParent()
    }
}


export class FlexLayoutContainer extends RenderContainer {
    style: {layout: ContainerLayoutAttr, draw: DrawAttr} = {
        layout: Object.assign(createDefaultLayoutAttr(), {type: LayoutType.Flex}),
        draw: createDefaultDrawAttr(),
    }
    constructor (cons?: ContainerConstructor) {
        super(cons)
    }
    layout () {
        
    }
}

export class AbsoluteLayoutContainer extends RenderContainer {
    style: {layout: ContainerLayoutAttr, draw: DrawAttr} = {
        layout: Object.assign(createDefaultLayoutAttr(), {type: LayoutType.Absolute}),
        draw: createDefaultDrawAttr(),
    }
    constructor (cons?: ContainerConstructor) {
        super(cons)
    }
    layout () {
        
    }
}

export interface ElementConstructor extends RenderConstructor {
    type?: string,
}

export class RenderElement extends RenderObject implements RenderNode {
    node: SVGElement | null = null
    constructor (cons?: ElementConstructor) {
        super(cons)
        if (cons) {
            if (cons.type)
                this.node = document.createElementNS(SVGNS, cons.type)
        }
    }
}

export class SVGRenderObject extends RenderElement {}

