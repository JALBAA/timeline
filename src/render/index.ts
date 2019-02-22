import { mixin, mixedFn, mixinFunction } from "../mixin";
import { Padding, Margin, Unit, FlexAlign, UnitType } from "./style";

class InheritableStyle {
    isInherit: boolean = false
}
interface FlexItemable {
    flex: number
    // alignItems: FlexAlign
    notifyFlexChange (val: number) : void
}

interface Gridable {
    x: number,
    y: number,
    globalX: number,
    globalY: number,
}
interface IsContainable {
    isContainable () : boolean
}
export interface Objectable extends IsContainable {
    destory () : void
    addParent (parent: Containable) : void
    removeParent () : void
}

export interface Selectable {
    select (key: string) : Renderer | Renderer[] | null
}


export interface Containable extends Objectable {
    addChild (child: Renderer) : void
    removeChild (child: Renderer) : void
    removeChildren () : void
}


export type Renderer = Objectable | Containable

// interface Elementable {
//     element
// }


export interface Styleable {
    layout () : void
    draw () : void
    computeStyle () : void
    changeStyle () : void
    // changeLayout () : 
}


function select (key: string, obj: RenderContainer) : Renderer[] | Renderer | null {
    return null
}
function getKeys<T, K extends keyof T> (o: T): K[] {
    return Object.keys(o).map(k => k as K)
}
function getProperty <T, K extends keyof T> (o: T, key: K): T[K] {
    return o[key]
}
function setProperty <T, K extends keyof T> (o: T, key: K, newValue: T[K]): T[K] {
    return o[key] = newValue
}
export interface ObjectCons {
    id?: string,
    class?: string,
    width?: Unit,
    height?: Unit,
    flex?: number,
}

// text, image, background, border

export interface ContainerCons extends ObjectCons {
    children?: Renderer[],
}

export class RenderObject implements Objectable, Styleable, Gridable {
    id: string = ''
    padding: Padding = new Padding
    margin: Margin = new Margin
    x: number = 0
    y: number = 0
    globalX: number = 0
    globalY: number = 0
    width: Unit = new Unit('auto')
    height: Unit = new Unit('auto')
    computedWidth: Unit = new Unit('auto')
    computedHeight: Unit = new Unit('auto')
    classNames: string[] = []
    protected parent: RenderContainer | null = null
    constructor (cons?: ObjectCons) {
        if (cons) {
            if (cons.id) this.id = cons.id
            if (cons.class) this.classNames.push(cons.class)
            if (cons.height) this.computedHeight = this.height = cons.height
            if (cons.width) this.computedWidth = this.width = cons.width
        }
    }
    addParent (parent: RenderContainer) {
        this.parent = parent
    }
    removeParent () {
        this.parent = null
        throw new Error('w')
    }
    isContainable () {return false}
    layout () {
        // this.globalX = this.x
        // this.globalY = this.y
    }
    draw () {}
    destory () {}
    changeStyle () {}
    inheritStyle<T> (parent: T, current: T, computed: T) {
        getKeys(parent).forEach(key => {
            const currentStyle = getProperty(current, key)
            const parentStyle = getProperty(parent, key)
            if (typeof currentStyle == 'string' && currentStyle == 'inherit') {
                // console.log(computed)
                setProperty(computed, key, parentStyle)
            }
        })
    }
    computeStyle () {
        
    }
}

// interface Layout {
//     padding: Padding
//     margin: Margin
//     width: Unit
//     height: Unit
// }
// interface FlexLayout {
//     direction: FlexDirection
// }

export class FlexItem extends RenderObject implements FlexItemable {
    private _flex: number = 0
    get flex () {
        return this._flex
    }
    set flex (val: number) {
        this.notifyFlexChange(val - this._flex)
        this._flex = val
    }
    notifyFlexChange (change: number) {
        if (this.parent) {
            const p = this.parent as FlexContainer
            p.flexItemSpaceChange(change)
        }
    }
    constructor (cons?: ObjectCons) {
        super(cons)
        if (cons) {
            if (cons.flex) this.flex = cons.flex
            else this.flex = 1
        }
        else this.flex = 1
    }
}

export class RenderContainer extends FlexItem implements Containable, Selectable {
    protected type: ContainerType = ContainerType.Flex
    protected children: Renderer[] = []
    constructor (cons?: ContainerCons) {
        super(cons)
        if (cons && cons.children) {
            cons.children.forEach(child => {
                this.addChild(child)
            })
        }
    }
    map<T extends Renderer> (cb: (item: T, index: number) => T) : T[] {
        return this.children.map((item, index) => {
            const i = item as T
            cb.call(this, i, index)
            return i
        })
    }
    forEach<T extends Renderer> (cb: (item: T, index: number) => void) : void {
        this.children.map((item, index) => {
            const i = item as T
            cb.call(this, i, index)
        })
    }
    addChild (child: Renderer) {
        this.children.push(child)
        child.addParent(this)
    }
    isContainable () {return true}
    removeChild (child: Renderer) {
        this.children = this.children.filter(item => item != child)
    }
    removeChildren () {
        this.children.forEach(child => {
            child.removeParent()
        })
        this.children = []
    }
    select (key: string) : Renderer[] | Renderer | null {
        return select(key, this)
    }

}
enum ContainerType {
    None = 'none',
    Flex = 'flex',
    Absolute = 'absolute',
}

enum FlexDirection {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
}
export interface FlexContainerCons extends ContainerCons {
    children?: FlexItem[]
    alignItems?: FlexAlign
    justifyContent?: FlexAlign
}
interface FlexContainable {
    flexItemSpaceChange (val: number) : void
}
export class FlexContainer extends RenderContainer implements FlexContainable {
    protected type: ContainerType = ContainerType.Flex
    protected direction: FlexDirection = FlexDirection.Horizontal
    protected flexSum: number = 0
    alignItems: FlexAlign = FlexAlign.Strech
    justifyContent: FlexAlign = FlexAlign.Start
    constructor (cons?: FlexContainerCons) {
        super(cons)
        if (cons) {
            if (cons.alignItems) {
                this.alignItems = cons.alignItems
            }
            if (cons.justifyContent) {
                this.justifyContent = cons.justifyContent
            }
        }
        // init flex sum
        this.forEach<FlexItem>(item => this.flexSum += item.flex)
    }
    layout () {
        this.forEach<RenderObject>((child, index) => {
            if (this.direction == FlexDirection.Horizontal) {
                child.globalX = child.x + this.globalX
                child.globalY = this.globalY
            } else {
                child.globalY = child.y + this.globalY
                child.globalX = this.globalX
            }
        })
    }
    computeStyle () {
        super.computeStyle()
        // TODO: 优化算法
        // let flexSum = this.flexSum
        const specifiedSpaces: Unit[] = [new Unit(0)]
        this.forEach<FlexItem>((child, index) => {
            // flexSum += child.flex
            if (this.direction == FlexDirection.Horizontal && child.width.type != UnitType.Auto) {
                specifiedSpaces.push(child.width)
                child.computedWidth = child.width
                child.flex = 0
            } else if (this.direction == FlexDirection.Vertical && child.height.type != UnitType.Auto) {
                specifiedSpaces.push(child.height)
                child.computedHeight = child.height
                child.flex = 0
            }
        })
        let flow = 0
        this.forEach<FlexItem>((child, index) => {
            const compute = (main: Unit, sub: Unit, parentMain: Unit, parentSub: Unit, origin: Unit, originSub: Unit) => {
                if (origin.type == UnitType.Auto) {
                    main.copy(Unit.mul(new Unit(child.flex / this.flexSum), Unit.sub(parentMain, ...specifiedSpaces) ))
                }
                if (this.alignItems == FlexAlign.Strech) {
                    if (originSub.type == UnitType.Auto) {
                        sub.copy(parentSub)
                    }
                }
                flow += main.value
            }
            if (this.direction == FlexDirection.Horizontal) {
                child.x = flow
                compute(child.computedWidth, child.computedHeight, this.computedWidth, this.computedHeight, child.width, child.height)
            }
            else if (this.direction == FlexDirection.Vertical) {
                child.y = flow
                compute(child.computedHeight, child.computedWidth, this.computedHeight, this.computedWidth, child.height, child.width)
            }
        })
    }
    addChild (child: FlexItem) {
        super.addChild(child as Renderer)
    }
    flexItemSpaceChange (val: number) {
        this.flexSum += val
    }
}
class Row extends FlexContainer {
    protected readonly direction: FlexDirection = FlexDirection.Horizontal
}

class Column extends FlexContainer {
    protected readonly direction: FlexDirection = FlexDirection.Vertical
}


interface RootCons extends FlexContainerCons {
    width: Unit,
    height: Unit,
}

export class RootContainer extends FlexContainer {
    protected readonly direction: FlexDirection = FlexDirection.Vertical
    constructor (cons: RootCons) {
        super(cons as ObjectCons)
        this.computedWidth = this.width = cons.width
        this.computedHeight = this.height = cons.height
    }
}

export class AbsoluteRenderContainer extends FlexContainer {
    type: ContainerType = ContainerType.Absolute
}