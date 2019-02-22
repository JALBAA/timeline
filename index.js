/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const style_1 = __webpack_require__(1);
class InheritableStyle {
    constructor() {
        this.isInherit = false;
    }
}
function select(key, obj) {
    return null;
}
function getKeys(o) {
    return Object.keys(o).map(k => k);
}
function getProperty(o, key) {
    return o[key];
}
function setProperty(o, key, newValue) {
    return o[key] = newValue;
}
class RenderObject {
    constructor(cons) {
        this.id = '';
        this.padding = new style_1.Padding;
        this.margin = new style_1.Margin;
        this.x = 0;
        this.y = 0;
        this.globalX = 0;
        this.globalY = 0;
        this.width = new style_1.Unit('auto');
        this.height = new style_1.Unit('auto');
        this.computedWidth = new style_1.Unit('auto');
        this.computedHeight = new style_1.Unit('auto');
        this.classNames = [];
        this.parent = null;
        if (cons) {
            if (cons.id)
                this.id = cons.id;
            if (cons.class)
                this.classNames.push(cons.class);
            if (cons.height)
                this.computedHeight = this.height = cons.height;
            if (cons.width)
                this.computedWidth = this.width = cons.width;
        }
    }
    addParent(parent) {
        this.parent = parent;
    }
    removeParent() {
        this.parent = null;
        throw new Error('w');
    }
    isContainable() { return false; }
    layout() {
        // this.globalX = this.x
        // this.globalY = this.y
    }
    draw() { }
    destory() { }
    changeStyle() { }
    inheritStyle(parent, current, computed) {
        getKeys(parent).forEach(key => {
            const currentStyle = getProperty(current, key);
            const parentStyle = getProperty(parent, key);
            if (typeof currentStyle == 'string' && currentStyle == 'inherit') {
                // console.log(computed)
                setProperty(computed, key, parentStyle);
            }
        });
    }
    computeStyle() {
    }
}
exports.RenderObject = RenderObject;
// interface Layout {
//     padding: Padding
//     margin: Margin
//     width: Unit
//     height: Unit
// }
// interface FlexLayout {
//     direction: FlexDirection
// }
class FlexItem extends RenderObject {
    constructor(cons) {
        super(cons);
        this._flex = 0;
        if (cons) {
            if (cons.flex)
                this.flex = cons.flex;
            else
                this.flex = 1;
        }
        else
            this.flex = 1;
    }
    get flex() {
        return this._flex;
    }
    set flex(val) {
        this.notifyFlexChange(val - this._flex);
        this._flex = val;
    }
    notifyFlexChange(change) {
        if (this.parent) {
            const p = this.parent;
            p.flexItemSpaceChange(change);
        }
    }
}
exports.FlexItem = FlexItem;
class RenderContainer extends FlexItem {
    constructor(cons) {
        super(cons);
        this.type = ContainerType.Flex;
        this.children = [];
        if (cons && cons.children) {
            cons.children.forEach(child => {
                this.addChild(child);
            });
        }
    }
    map(cb) {
        return this.children.map((item, index) => {
            const i = item;
            cb.call(this, i, index);
            return i;
        });
    }
    forEach(cb) {
        this.children.map((item, index) => {
            const i = item;
            cb.call(this, i, index);
        });
    }
    addChild(child) {
        this.children.push(child);
        child.addParent(this);
    }
    isContainable() { return true; }
    removeChild(child) {
        this.children = this.children.filter(item => item != child);
    }
    removeChildren() {
        this.children.forEach(child => {
            child.removeParent();
        });
        this.children = [];
    }
    select(key) {
        return select(key, this);
    }
}
exports.RenderContainer = RenderContainer;
var ContainerType;
(function (ContainerType) {
    ContainerType["None"] = "none";
    ContainerType["Flex"] = "flex";
    ContainerType["Absolute"] = "absolute";
})(ContainerType || (ContainerType = {}));
var FlexDirection;
(function (FlexDirection) {
    FlexDirection["Vertical"] = "vertical";
    FlexDirection["Horizontal"] = "horizontal";
})(FlexDirection || (FlexDirection = {}));
class FlexContainer extends RenderContainer {
    constructor(cons) {
        super(cons);
        this.type = ContainerType.Flex;
        this.direction = FlexDirection.Horizontal;
        this.flexSum = 0;
        this.alignItems = style_1.FlexAlign.Strech;
        this.justifyContent = style_1.FlexAlign.Start;
        if (cons) {
            if (cons.alignItems) {
                this.alignItems = cons.alignItems;
            }
            if (cons.justifyContent) {
                this.justifyContent = cons.justifyContent;
            }
        }
        // init flex sum
        this.forEach(item => this.flexSum += item.flex);
    }
    layout() {
        this.forEach((child, index) => {
            if (this.direction == FlexDirection.Horizontal) {
                child.globalX = child.x + this.globalX;
                child.globalY = this.globalY;
            }
            else {
                child.globalY = child.y + this.globalY;
                child.globalX = this.globalX;
            }
        });
    }
    computeStyle() {
        super.computeStyle();
        // TODO: 优化算法
        // let flexSum = this.flexSum
        const specifiedSpaces = [new style_1.Unit(0)];
        this.forEach((child, index) => {
            // flexSum += child.flex
            if (this.direction == FlexDirection.Horizontal && child.width.type != style_1.UnitType.Auto) {
                specifiedSpaces.push(child.width);
                child.computedWidth = child.width;
                child.flex = 0;
            }
            else if (this.direction == FlexDirection.Vertical && child.height.type != style_1.UnitType.Auto) {
                specifiedSpaces.push(child.height);
                child.computedHeight = child.height;
                child.flex = 0;
            }
        });
        let flow = 0;
        this.forEach((child, index) => {
            const compute = (main, sub, parentMain, parentSub, origin, originSub) => {
                if (origin.type == style_1.UnitType.Auto) {
                    main.copy(style_1.Unit.mul(new style_1.Unit(child.flex / this.flexSum), style_1.Unit.sub(parentMain, ...specifiedSpaces)));
                }
                if (this.alignItems == style_1.FlexAlign.Strech) {
                    if (originSub.type == style_1.UnitType.Auto) {
                        sub.copy(parentSub);
                    }
                }
                flow += main.value;
            };
            if (this.direction == FlexDirection.Horizontal) {
                child.x = flow;
                compute(child.computedWidth, child.computedHeight, this.computedWidth, this.computedHeight, child.width, child.height);
            }
            else if (this.direction == FlexDirection.Vertical) {
                child.y = flow;
                compute(child.computedHeight, child.computedWidth, this.computedHeight, this.computedWidth, child.height, child.width);
            }
        });
    }
    addChild(child) {
        super.addChild(child);
    }
    flexItemSpaceChange(val) {
        this.flexSum += val;
    }
}
exports.FlexContainer = FlexContainer;
class Row extends FlexContainer {
    constructor() {
        super(...arguments);
        this.direction = FlexDirection.Horizontal;
    }
}
class Column extends FlexContainer {
    constructor() {
        super(...arguments);
        this.direction = FlexDirection.Vertical;
    }
}
class RootContainer extends FlexContainer {
    constructor(cons) {
        super(cons);
        this.direction = FlexDirection.Vertical;
        this.computedWidth = this.width = cons.width;
        this.computedHeight = this.height = cons.height;
    }
}
exports.RootContainer = RootContainer;
class AbsoluteRenderContainer extends FlexContainer {
    constructor() {
        super(...arguments);
        this.type = ContainerType.Absolute;
    }
}
exports.AbsoluteRenderContainer = AbsoluteRenderContainer;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BorderType;
(function (BorderType) {
    BorderType["Solid"] = "solid";
    BorderType["Dashed"] = "dashed";
})(BorderType = exports.BorderType || (exports.BorderType = {}));
var FlexAlign;
(function (FlexAlign) {
    FlexAlign["Center"] = "center";
    FlexAlign["Start"] = "start";
    FlexAlign["End"] = "end";
    FlexAlign["Strech"] = "strech";
})(FlexAlign = exports.FlexAlign || (exports.FlexAlign = {}));
var UnitType;
(function (UnitType) {
    UnitType["PX"] = "px";
    UnitType["REM"] = "rem";
    UnitType["Percent"] = "percent";
    UnitType["Auto"] = "auto";
})(UnitType = exports.UnitType || (exports.UnitType = {}));
class Unit {
    constructor(value, type = UnitType.PX) {
        this.type = UnitType.PX;
        this.value = 0;
        if (typeof value == 'string') {
            if (value == 'auto') {
                this.value = NaN;
                this.type = UnitType.Auto;
            }
            else {
                const valueAndType = value.split(/(.+)(px|rem|%)/);
                if (valueAndType) {
                    valueAndType.pop();
                    valueAndType.shift();
                    this.value = Number(valueAndType[0]);
                    const type = valueAndType[1];
                    switch (type) {
                        case 'px':
                            this.type = UnitType.PX;
                            break;
                        case 'rem':
                            this.type = UnitType.REM;
                            break;
                        case '%':
                            this.type = UnitType.Percent;
                            break;
                    }
                }
            }
        }
        else {
            this.value = value;
            this.type = type;
        }
    }
    static _isTypeEqual(...args) {
        // if (v1.type == v2.type) return true
        // else return false
        if (args.length == 0)
            return false;
        else {
            return args.every(arg => arg.type == args[0].type);
        }
    }
    // static isTypeComputeable (v1: Unit, v2: Unit) : boolean {
    //     if (v1.type != 'auto' && v2.type != 'auto') return true
    //     else return false
    // }
    static _compute(sign, ...args) {
        if (Unit._isTypeEqual(...args)) {
            const unitType = args[0].type;
            return new Unit(args.reduce((prev, cur) => {
                return new Unit(sign(prev.value, cur.value), unitType);
            }).value, unitType);
        }
        else {
            throw new Error('types not equal');
        }
    }
    static add(...args) {
        return Unit._compute((a, b) => { return a + b; }, ...args);
    }
    static sub(...args) {
        return Unit._compute((a, b) => { return a - b; }, ...args);
    }
    static mul(...args) {
        return Unit._compute((a, b) => { return a * b; }, ...args);
    }
    static div(...args) {
        return Unit._compute((a, b) => { return a / b; }, ...args);
    }
    toString() {
        return this.value + this.type.toString();
    }
    copy(val) {
        this.value = val.value;
        this.type = val.type;
    }
}
exports.Unit = Unit;
class PixelUnit extends Unit {
    constructor(value) {
        super(value);
    }
}
exports.PixelUnit = PixelUnit;
class AutoUnit extends Unit {
    constructor() {
        super('auto');
    }
}
exports.AutoUnit = AutoUnit;
class PercentUnit extends Unit {
    constructor(value) {
        super(value, UnitType.Percent);
    }
}
exports.PercentUnit = PercentUnit;
class Box {
    constructor(box) {
        this.left = new Unit(0);
        this.right = new Unit(0);
        this.top = new Unit(0);
        this.bottom = new Unit(0);
        if (box) {
            if (box.left)
                this.left = box.left;
            if (box.right)
                this.right = box.right;
            if (box.top)
                this.top = box.top;
            if (box.bottom)
                this.bottom = box.bottom;
        }
    }
}
exports.Box = Box;
class Padding extends Box {
}
exports.Padding = Padding;
class Margin extends Box {
}
exports.Margin = Margin;
class Color {
    constructor(r, g = 0, b = 0) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        if (typeof r == 'string') {
            if (r[0] != '#')
                throw new Error('valid hex type');
            r = r.replace(/^\#/, '');
            this.r = Number(Color.hexToNumber(r.slice(0, 2)));
            this.g = Number(Color.hexToNumber(r.slice(2, 4)));
            this.b = Number(Color.hexToNumber(r.slice(4, 6)));
        }
        else {
            this.r = r;
            this.g = g;
            this.b = b;
        }
    }
    static hexToNumber(s) {
        function hexCharToNumber(char) {
            switch (char) {
                case 'a':
                    return 10;
                case 'b':
                    return 11;
                case 'c':
                    return 12;
                case 'd':
                    return 13;
                case 'e':
                    return 14;
                case 'f':
                    return 15;
                default:
                    return Number(char);
            }
        }
        const c1 = s[0];
        const c2 = s[1];
        return hexCharToNumber(c1) * hexCharToNumber(c2);
    }
}
exports.Color = Color;
class BorderStyle {
}
class BackgroundStyle {
}
class ElementStyle {
}
class TextStyle {
}
class FlexItem {
    constructor() {
        this.flex = 1;
    }
}
class AbsoluteLayout {
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = __webpack_require__(3);
const render_1 = __webpack_require__(0);
const style_1 = __webpack_require__(1);
const canvas_1 = __webpack_require__(4);
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

`;
const Child2Style = {};
console.log(new style_1.Unit(500));
const c = document.getElementById('canvas');
if (c) {
    const ctx = c.getContext('2d');
    const a = new render_1.FlexContainer({
        id: 'child2.container',
        flex: 1,
        children: [
            new canvas_1.CanvasElement({
                class: 'tt',
                ctx,
            }),
            new canvas_1.CanvasElement({
                class: 'tt',
                ctx,
            }),
            new canvas_1.CanvasElement({
                class: 'tt',
                ctx,
            }),
            new canvas_1.CanvasElement({
                class: 'tt',
                ctx,
            }),
        ],
    });
    const b = new canvas_1.CanvasElement({
        id: 'child1',
        ctx,
        height: new style_1.Unit(50),
    });
    const root = new render_1.RootContainer({
        id: 'root',
        width: new style_1.Unit(500),
        height: new style_1.Unit(500),
        children: [
            b,
            a,
            new canvas_1.CanvasElement({
                id: 'child33',
                ctx,
            }),
        ],
    });
    setTimeout(() => {
        a.flex = 2;
    }, 1000);
    setTimeout(() => {
        a.height = new style_1.Unit(50);
        a.width = new style_1.Unit(150);
    }, 2000);
    const manager = new manager_1.Manager(ctx);
    manager.manage(root);
    console.log(root);
}
// console.log(a)


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BaseManager {
    constructor(root) {
        this.root = root;
        // window.requestAnimationFrame(() => {
        //     this.renderFrame()
        // })
    }
}
class ComputeManager extends BaseManager {
    computeStyle(node) {
        node.computeStyle();
        if (node.isContainable()) {
            node.forEach(child => {
                this.computeStyle(child);
            });
        }
    }
    renderFrame() {
        this.computeStyle(this.root);
        // super.renderFrame()
    }
}
exports.ComputeManager = ComputeManager;
class DrawManager extends BaseManager {
    draw(node) {
        node.draw();
        if (node.isContainable()) {
            node.forEach(child => {
                this.draw(child);
            });
        }
    }
    renderFrame() {
        this.draw(this.root);
    }
}
exports.DrawManager = DrawManager;
class LayoutManager extends BaseManager {
    layout(node) {
        node.layout();
        if (node.isContainable()) {
            node.forEach(child => {
                this.layout(child);
            });
        }
    }
    renderFrame() {
        this.layout(this.root);
    }
}
exports.LayoutManager = LayoutManager;
class Manager {
    constructor(ctx) {
        this.ctx = ctx;
    }
    manage(root) {
        this.root = root;
        this.compute = new ComputeManager(root);
        this.layout = new LayoutManager(root);
        this.draw = new DrawManager(root);
        window.requestAnimationFrame(() => {
            this.renderFrame();
        });
    }
    renderFrame() {
        if (this.root) {
            this.ctx && this.ctx.clearRect(0, 0, this.root.width.value, this.root.height.value);
        }
        this.ctx && this.ctx.save();
        this.compute && this.compute.renderFrame();
        this.layout && this.layout.renderFrame();
        this.draw && this.draw.renderFrame();
        window.requestAnimationFrame(() => {
            // this.renderFrame()
        });
        this.ctx && this.ctx.restore();
    }
}
exports.Manager = Manager;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const render_1 = __webpack_require__(0);
function color16() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
}
class CanvasElement extends render_1.FlexItem {
    constructor(cons) {
        super(cons);
        this.ctx = cons.ctx;
    }
    draw() {
        this.ctx.fillStyle = color16();
        this.ctx.beginPath();
        this.ctx.moveTo(this.globalX, this.globalY);
        this.ctx.lineTo(this.globalX + this.computedWidth.value, this.globalY);
        this.ctx.lineTo(this.globalX + this.computedWidth.value, this.globalY + this.computedHeight.value);
        this.ctx.lineTo(this.globalX, this.globalY + this.computedHeight.value);
        this.ctx.lineTo(this.globalX, this.globalY);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fillRect(this.globalX, this.globalY, this.computedWidth.value, this.computedHeight.value);
    }
}
exports.CanvasElement = CanvasElement;
class CanvasContainer extends render_1.FlexContainer {
    constructor(cons) {
        super(cons);
        this.ctx = cons.ctx;
    }
    draw() {
    }
}


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map