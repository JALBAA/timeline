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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = __webpack_require__(1);
exports.UNIT = 10;
let cid = 0;
class RenderableObject {
    constructor() {
        this.coord = {
            x: new grid_1.default(0),
            y: new grid_1.default(0),
        };
        this.height = new grid_1.default(1);
        this.width = new grid_1.default(1);
        this.node = null;
        this._parent = null;
        this._children = [];
        this._cid = 0;
        this._cid = ++cid;
    }
    get parent() {
        return this._parent;
    }
    get children() {
        return this._children;
    }
    get cid() {
        return this._cid;
    }
    addParent(parent) {
        this._parent = parent;
    }
    removeParent() {
        this._parent = null;
    }
    addChild(child) {
        this._children.push(child);
        child.addParent(this);
        if (this.node && child.node) {
            this.node.appendChild(child.node);
        }
    }
    removeChild(target) {
        this._children = this._children.filter(child => {
            const r = child.cid != target.cid;
            if (r && this.node && target.node) {
                target.removeParent();
                this.node.removeChild(target.node);
            }
            return r;
        });
    }
    removeAll() {
        this._children = this._children.filter(child => {
            if (this.node && child.node) {
                child.removeParent();
                this.node.removeChild(child.node);
            }
            return false;
        });
    }
    _transform(parent, coord) {
        const x = parent.coord.x.add(coord.x);
        const y = parent.coord.y.add(coord.y);
        if (parent.parent !== null) {
            return this._transform(parent.parent, { x, y });
        }
        else {
            return { x, y };
        }
    }
    getWorldPos() {
        if (this.parent === null) {
            return this.coord;
        }
        else {
            // 变换
            return this._transform(this.parent, this.coord);
        }
    }
    translate(coord) {
        // deepcopy，防止引用发生
        this.coord = {
            x: new grid_1.default(coord.x),
            y: new grid_1.default(coord.y),
        };
    }
    _nodeTranslate(coord) {
    }
    _draw(coord) {
    }
    draw() {
        const coord = this.getWorldPos();
        this._draw(coord);
        this.children.forEach(child => child.draw());
    }
}
exports.default = RenderableObject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.unit = 25;
class Grid {
    constructor(n) {
        this._value = 0;
        if (n instanceof Grid) {
            this._value = n.valueOf();
        }
        else {
            this._value = n * exports.unit;
        }
    }
    get value() {
        return this._value;
    }
    add(g) {
        return new Grid((this._value + g.value) / exports.unit);
    }
    sub(g) {
        return new Grid((this._value - g.value) / exports.unit);
    }
    mul(g) {
        if (g instanceof Number) {
            return new Grid(this._value * g);
        }
        else {
            return new Grid((this._value / exports.unit) * (g.value / exports.unit));
        }
    }
    div(g) {
        if (g instanceof Number) {
            return new Grid(this._value / g);
        }
        else {
            return new Grid((this._value / exports.unit) / (g.value / exports.unit));
        }
    }
    valueOf() {
        return this.value;
    }
    toString() {
        return this.value.toString();
    }
}
exports.default = Grid;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const RenderableObject_1 = __webpack_require__(0);
const Global_1 = __webpack_require__(5);
class Container extends RenderableObject_1.default {
    constructor() {
        super(...arguments);
        this.node = document.createElementNS(Global_1.SVGNS, 'g');
    }
    _draw() {
        this.node.setAttribute('transform', `translate(${this.coord.x}, ${this.coord.y})`);
    }
}
exports.default = Container;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Line_1 = __webpack_require__(4);
const Stage_1 = __webpack_require__(6);
const grid_1 = __webpack_require__(1);
const Railway_1 = __webpack_require__(7);
const Debug_1 = __webpack_require__(8);
const Time_1 = __webpack_require__(9);
const RenderableJob_1 = __webpack_require__(10);
const l = new Line_1.default;
const l2 = new Line_1.default;
const debugGrid = new Debug_1.DebugGrid;
const body = document.querySelector('body');
if (body) {
    const stage = new Stage_1.default(body, 500, 500);
    stage.addChild(debugGrid);
    const railway = new Railway_1.default;
    const job = new RenderableJob_1.default('t', 'i');
    // const r2 = new Railway
    // const l3 = new Line
    // r2.addChild(l3)
    // r2.translate({
    //     x: new Grid(0),
    //     y: new Grid(2),
    // })
    // l3.width = new Grid(5)
    // r2.height = new Grid(2)
    // stage.addChild(r2)
    // // svg.appendChild(l.node)
    // // svg.appendChild(l2.node)
    railway.addChild(l);
    // railway.addChild(l2)
    // railway.height = new Grid(2)
    // railway.translate({
    //     y: new Grid(1),
    //     x: new Grid(0),
    // })
    stage.addChild(railway);
    // // stage.addChild(l)
    // // stage.addChild(l2)
    railway.translate({ x: new grid_1.default(0), y: new grid_1.default(2) });
    l.width = new grid_1.default(5);
    // l2.translate({x: new Grid(4), y: new Grid(.5)})
    // l2.width = new Grid(3)
    // stage.draw()
    // setTimeout (() => {
    //     // const coord = l.coord
    //     // l.translate({x: l.coord.x.add(new Grid(1)), y: l.coord.y})
    //     // l.width = l.width.add(new Grid(1))
    //     // l.draw()
    //     l2.width = l2.width.add(new Grid(1))
    //     stage.draw()
    // }, 1600)
    const t = new Time_1.Time;
    console.log(t);
    t.view.translate({
        x: t.view.coord.x,
        y: new grid_1.default(1),
    });
    // t.travelForward()
    stage.addChild(t.view);
    console.log(t.view);
    stage.draw();
    setInterval(() => {
        // t.travelForward()
        // l.translate({x: l.coord.x.add(new Grid(1)), y: l.coord.y})
        // console.log(t.end)
        stage.draw();
    }, 1000);
    const forward = document.querySelector('#forward');
    if (forward) {
        forward.addEventListener('click', e => {
            t.travelForward();
            stage.draw();
        });
    }
    const backward = document.querySelector('#backward');
    if (backward) {
        backward.addEventListener('click', e => {
            t.travelBackward();
            stage.draw();
        });
    }
}
// forward.
Object.defineProperty(window, 'Grid', {
    value: grid_1.default,
});
var g1 = new grid_1.default(0);
var g2 = new grid_1.default(1);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import Handle from "./Handle";
const RenderableObject_1 = __webpack_require__(0);
const grid_1 = __webpack_require__(1);
const Container_1 = __webpack_require__(2);
// import { Coord } from "../interface/ICoordinate";
// export default class Line extends Coordinate implements Drawable, Dragable {
//     start: Handle = new Handle
//     end: Handle = new Handle
//     node: SVGLineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line')
//     constructor () {
//         super()
//         this.addChild(this.start)
//         this.addChild(this.end)
//         this.node.setAttribute('x1', this.start.x.toString())
//         this.node.setAttribute('y1', this.start.y.toString())
//         this.node.setAttribute('x2', this.end.x.toString())
//         this.node.setAttribute('y2', this.end.y.toString())
//         this.node.setAttribute('style', 'stroke:rgb(255,0,0);stroke-width:2')
//     }
//     protected _posChange () {
//         this.node.setAttribute('x1', this.start.x.toString())
//         this.node.setAttribute('y1', this.start.y.toString())
//     }
//     draw () {
//     }
//     onDrag () {
//     }
// }
const ns = 'http://www.w3.org/2000/svg';
class Handle extends RenderableObject_1.default {
    constructor() {
        super();
        this.node = document.createElementNS(ns, 'circle');
        this.height = new grid_1.default(.25);
    }
    get width() {
        return this.height;
    }
    set width(val) {
        this.height = val;
    }
    _draw() {
        this.node.setAttribute('cx', this.coord.x.toString());
        this.node.setAttribute('cy', this.coord.y.toString());
        this.node.setAttribute('r', (this.height.value).toString());
    }
}
exports.Handle = Handle;
class Path extends RenderableObject_1.default {
    constructor() {
        super(...arguments);
        // private _height: number = 0
        // private _width: number = 0
        // get height () {
        //     return this._height
        // }
        // get width () {
        //     return this._width
        // }
        this.node = document.createElementNS(ns, 'line');
    }
    _draw() {
        this.node.setAttribute('x1', this.coord.x.toString());
        this.node.setAttribute('y1', this.coord.y.toString());
        this.node.setAttribute('x2', (this.coord.x.add(this.width)).value.toString());
        this.node.setAttribute('y2', this.coord.y.toString());
    }
}
exports.Path = Path;
class Line extends Container_1.default {
    constructor() {
        super();
        this.leftHandle = new Handle;
        this.rightHandle = new Handle;
        this.path = new Path;
        this._width = new grid_1.default(1);
        this.addChild(this.path);
        this.path.translate({
            x: this.path.coord.x,
            y: this.path.height.div(new grid_1.default(2)),
        });
        this.addChild(this.leftHandle);
        this.leftHandle.translate({
            x: this.leftHandle.width,
            y: this.height.div(new grid_1.default(2)),
        });
        this.addChild(this.rightHandle);
    }
    get width() {
        return this._width;
    }
    set width(l) {
        if (this.rightHandle) {
            const coord = this.rightHandle.coord;
            this._width = l;
            this.rightHandle.translate({
                x: l.sub(this.rightHandle.width),
                y: this.height.div(new grid_1.default(2)),
            });
            this.path.width = l;
        }
    }
    _draw() {
        super._draw();
        this.node.setAttribute('style', 'stroke:black;stroke-width:2;fill:red');
    }
}
exports.default = Line;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SVGNS = 'http://www.w3.org/2000/svg';


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const RenderableObject_1 = __webpack_require__(0);
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
const ns = 'http://www.w3.org/2000/svg';
class Stage extends RenderableObject_1.default {
    constructor(container, width, height) {
        super();
        this.node = document.createElementNS(ns, 'svg');
        container.appendChild(this.node);
        this.node.setAttribute('width', `${width}px`);
        this.node.setAttribute('height', `${height}px`);
        // this.node.setAttribute('viewBox', `0 0 ${width} ${height}`)
    }
}
exports.default = Stage;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const RenderableObject_1 = __webpack_require__(0);
const grid_1 = __webpack_require__(1);
const Container_1 = __webpack_require__(2);
const ns = 'http://www.w3.org/2000/svg';
class RailwayEntity extends RenderableObject_1.default {
    constructor() {
        super(...arguments);
        this.height = new grid_1.default(1);
        this.coord = {
            x: new grid_1.default(0),
            y: new grid_1.default(0),
        };
        this.node = document.createElementNS(ns, 'rect');
    }
    _draw({ x, y }) {
        if (this.parent) {
            this.node.setAttribute('height', this.height.toString());
            this.node.setAttribute('width', (this.parent.width).mul(new grid_1.default(50)).value.toString());
        }
        this.node.setAttribute('x', this.coord.x.toString());
        this.node.setAttribute('y', this.coord.y.toString());
        // this.node.setAttribute('y', (y.add(new Grid(.5)).value/* - this.height.value/2*/).toString())
        this.node.setAttribute('style', 'stroke-width: 0;stroke: gray;fill: rgba(0,0,0,0.2);');
    }
}
class Railway extends Container_1.default {
    constructor() {
        super();
        // _draw () {
        //     this._detectCollision()
        // }
        // detect lines coliision
        this.railway = new RailwayEntity;
        this.addChild(this.railway);
    }
    _draw() {
        super._draw();
        this._detectCollision();
    }
    _detectCollision() {
        // 
    }
}
exports.default = Railway;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const RenderableObject_1 = __webpack_require__(0);
const grid_1 = __webpack_require__(1);
class Tile extends RenderableObject_1.default {
    constructor() {
        super(...arguments);
        this.node = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.height = new grid_1.default(1);
        this.width = new grid_1.default(1);
        this.blackOrWhite = 'black';
    }
    _draw() {
        this.node.setAttribute('width', this.height.value.toString());
        this.node.setAttribute('height', this.width.value.toString());
        this.node.setAttribute('x', (this.coord.x.value /* - this.height.value/2*/).toString());
        this.node.setAttribute('y', (this.coord.y.value /* - this.height.value/2*/).toString());
        if (this.blackOrWhite == 'black')
            this.node.setAttribute('style', 'stroke-width: 0;stroke: gray;fill: rgba(120,0,0,0.2);');
        else
            this.node.setAttribute('style', 'stroke-width: 0;stroke: gray;fill: rgba(120,255,255,0.2);');
    }
}
class DebugGrid extends RenderableObject_1.default {
    constructor() {
        super();
        this.node = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        for (let x = 0; x < 30; x++) {
            for (let y = 0; y < 30; y++) {
                const tile = new Tile();
                if (x % 2 == 0) {
                    if (y % 2 == 0) {
                        tile.blackOrWhite = 'black';
                    }
                    else {
                        tile.blackOrWhite = 'white';
                    }
                }
                else {
                    if (y % 2 == 0) {
                        tile.blackOrWhite = 'white';
                    }
                    else {
                        tile.blackOrWhite = 'black';
                    }
                }
                tile.translate({
                    x: new grid_1.default(x),
                    y: new grid_1.default(y),
                });
                this.addChild(tile);
            }
        }
    }
    _draw() {
        // this.node.setAttribute('style', 'stroke-width: 1;stroke: gray;fill: rgba(0,0,0,0.4);')
    }
}
exports.DebugGrid = DebugGrid;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const RenderableObject_1 = __webpack_require__(0);
const grid_1 = __webpack_require__(1);
const Container_1 = __webpack_require__(2);
const ns = 'http://www.w3.org/2000/svg';
// class Timeline extends RenderableObject{
//     addChild (child: Day) {
//         super.addChild(child)
//     }
//     removeChild (child: Day) {
//         super.removeChild(child)
//     }
//     constructor () {
//         super()
//     }
//     forward () {
//     }
//     backward () {
//     }
// }
class DayTileBG extends RenderableObject_1.default {
    constructor() {
        super();
        this.node = document.createElementNS(ns, 'rect');
        this.oddOrEven = 'even';
        if (this._cid % 2 != 0) {
            this.oddOrEven = 'odd';
        }
    }
    _draw() {
        const newY = (this.coord.y.sub(this.height));
        if (this.oddOrEven == 'even') {
            this.node.setAttribute('style', 'stroke-width: .5;stroke: gray;fill: rgba(255,255,255,1);');
        }
        else {
            this.node.setAttribute('style', 'stroke-width: .5;stroke: gray;fill: rgba(200,200,200,1);');
        }
        this.node.setAttribute('x', this.coord.x.toString());
        this.node.setAttribute('y', newY.toString());
        this.node.setAttribute('width', this.width.toString());
        this.node.setAttribute('height', this.height.toString());
    }
}
class DayText extends RenderableObject_1.default {
    constructor() {
        super(...arguments);
        this.node = document.createElementNS(ns, 'text');
    }
    _draw() {
        const newY = this.coord.y.sub(new grid_1.default(.3));
        const newX = this.coord.x.add(new grid_1.default(.2));
        this.node.setAttribute('font-size', '12px');
        this.node.setAttribute('x', newX.toString());
        this.node.setAttribute('y', newY.toString());
    }
}
class DayTile extends Container_1.default {
    constructor(day) {
        super();
        // node: SVGTextElement = document.createElementNS(ns, 'text')
        this.day = null;
        this.bg = new DayTileBG;
        this.text = new DayText;
        this.addChild(this.bg);
        this.addChild(this.text);
        this.text.translate(this.coord);
        this.bg.translate(this.coord);
        if (day) {
            this.day = day;
        }
    }
    _draw() {
        super._draw();
        // this.node.setAttribute('font-size', '12px')
        // this.node.setAttribute('x', this.coord.x.value.toString())
        // this.node.setAttribute('y', this.coord.y.value.toString())
        // const d =  this.day ? (this.day.date.getDate().toString()) : ''
        // this.node.innerHTML = this.day ? d : 'no date'
        // this.text.node.setAttribute('font-size', '12px')
        // this.text.node.setAttribute('x', this.coord.x.value.toString())
        // this.text.node.setAttribute('y', this.coord.y.value.toString())
        const d = this.day ? (this.day.date.getDate().toString()) : '';
        this.text.node.innerHTML = this.day ? d : 'no date';
    }
}
class MonthTile extends RenderableObject_1.default {
    constructor() {
        super(...arguments);
        this.node = document.createElementNS(ns, 'g');
    }
}
class TimeRuler extends Container_1.default {
    addChild(child) {
        super.addChild(child);
    }
    removeChild(child) {
        super.removeChild(child);
    }
    updateData(days, pivotPos) {
        this.removeAll();
        days.forEach((day, index) => {
            const tile = new DayTile(day);
            tile.translate({
                x: new grid_1.default(index - pivotPos),
                y: new grid_1.default(0),
            });
            this.addChild(tile);
        });
    }
}
exports.TimeRuler = TimeRuler;
class Day {
    constructor(d) {
        // node: SVGTextElement = document.createElementNS(ns, 'text')
        this.date = new Date;
        if (d) {
            this.date = new Date(d.getTime());
        }
    }
    addDayByNumber(d) {
        return new Day(new Date(this.date.getTime() + d * 1000 * 60 * 60 * 24));
    }
    subDayByNumber(d) {
        return new Day(new Date(this.date.getTime() - d * 1000 * 60 * 60 * 24));
    }
    forward() {
        this.date = new Date(this.date.getTime() + 1000 * 60 * 60 * 24);
    }
    backward() {
        this.date = new Date(this.date.getTime() - 1000 * 60 * 60 * 24);
    }
    getTime() {
        return this.date.getTime();
    }
}
exports.Day = Day;
class Time {
    constructor(d = null) {
        this.days = [];
        this.view = new TimeRuler;
        this.end = null;
        this.start = null;
        this.pivot = new Day(new Date);
        this.pivotPos = 5;
        this.dayLength = 30;
        if (d) {
            if (d instanceof Day) {
                this.pivot = d;
            }
            else if (d instanceof Date) {
                this.pivot = new Day(d);
            }
        }
        this.end = this.pivot.subDayByNumber(this.pivotPos);
        this.start = this.pivot.addDayByNumber(this.dayLength - this.pivotPos);
        this.updateDays();
    }
    updateDays() {
        if (this.end && this.start) {
            let pointer = new Day(new Date(this.end.date.getTime()));
            this.days = [];
            while (pointer.getTime() < this.start.getTime()) {
                this.days.push(new Day(pointer));
                pointer = pointer.addDayByNumber(1);
            }
        }
        this.view.updateData(this.days, this.pivotPos);
    }
    travelForward() {
        this.pivot = this.pivot.addDayByNumber(1);
        this.end = this.pivot.subDayByNumber(this.pivotPos);
        this.start = this.pivot.addDayByNumber(this.dayLength - this.pivotPos);
        this.updateDays();
        // this.days.shift()
        // if (this.end)
        //     this.days.push(this.end)
    }
    travelBackward() {
        this.pivot = this.pivot.addDayByNumber(-1);
        this.end = this.pivot.subDayByNumber(this.pivotPos);
        this.start = this.pivot.addDayByNumber(this.dayLength - this.pivotPos);
        this.updateDays();
        // this.days.pop()
        // if (this.start)
        //     this.days.unshift(this.start)
    }
}
exports.Time = Time;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __webpack_require__(11);
const Line_1 = __webpack_require__(4);
class RenderableJob {
    constructor() {
        this.job = new Job_1.default('', '');
        this.view = null;
    }
}
class LineJob extends RenderableJob {
    constructor(title, info) {
        super();
        this.view = new Line_1.default;
        this.job.title = title;
        this.job.info = info;
    }
    addParent(parent) {
        this.view.addParent(parent);
    }
    removeParent() {
        this.view.removeParent();
    }
    addChild(child) {
        this.view.addChild(child);
    }
    removeChild(target) {
        this.view.removeChild(target);
    }
    removeAll() {
        this.view.removeAll();
    }
    getWorldPos() {
        return this.view.getWorldPos();
    }
    translate(coord) {
        this.view.translate(coord);
    }
    draw() {
        this.view.draw();
    }
}
exports.default = LineJob;
class IconJob {
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JobStatus;
(function (JobStatus) {
    JobStatus[JobStatus["None"] = 0] = "None";
    JobStatus[JobStatus["Done"] = 1] = "Done";
    JobStatus[JobStatus["Doing"] = 2] = "Doing";
    JobStatus[JobStatus["Pending"] = 3] = "Pending";
    JobStatus[JobStatus["Pause"] = 4] = "Pause";
    JobStatus[JobStatus["Timeout"] = 5] = "Timeout";
})(JobStatus = exports.JobStatus || (exports.JobStatus = {}));
var JobType;
(function (JobType) {
    JobType[JobType["None"] = 0] = "None";
    JobType[JobType["Default"] = 1] = "Default";
})(JobType = exports.JobType || (exports.JobType = {}));
// import Position from '../docorators/Position'
// @Position({
//     x: 0,
//     y: 0
// })
class Schedule {
    constructor() {
        this.developStart = new Date;
        this.developEnd = new Date;
        this.testStart = new Date;
        this.testEnd = new Date;
        this.release = new Date;
        this.integrationStart = new Date;
        this.integrationEnd = new Date;
        this.finished = new Date;
    }
}
exports.Schedule = Schedule;
class Job {
    constructor(title, info) {
        this.status = JobStatus.None;
        this.schedule = new Schedule;
        this.type = JobType.Default;
        this.title = '';
        this.info = '';
        this.initSchedule();
    }
    initSchedule() {
        function dateAdd1Day(date) {
            return new Date(date.getTime() + 1000 * 60 * 60 * 24);
        }
        this.schedule.developStart = new Date();
        this.schedule.developEnd = dateAdd1Day(this.schedule.developStart);
        this.schedule.testStart = dateAdd1Day(this.schedule.developEnd);
        this.schedule.testEnd = dateAdd1Day(this.schedule.testStart);
        this.schedule.release = dateAdd1Day(this.schedule.testEnd);
        this.schedule.integrationStart = dateAdd1Day(this.schedule.release);
        this.schedule.integrationEnd = dateAdd1Day(this.schedule.integrationStart);
        this.schedule.finished = dateAdd1Day(this.schedule.integrationEnd);
    }
    // owner: Owner | null = null
    // partener: Partener[] | null = null
    addOwner(owner) {
    }
    addPartener(partener) {
    }
}
exports.default = Job;


/***/ })
/******/ ]);