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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
    onDraw() {
    }
    draw() {
        this.beforeDraw();
        // const coord = this.getWorldPos()
        this.onDraw();
        this.children.forEach(child => child.draw());
        this.afterDraw();
    }
    beforeDraw() {
    }
    afterDraw() {
    }
}
exports.default = RenderableObject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.unit = 40;
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
const Global_1 = __webpack_require__(6);
class Container extends RenderableObject_1.default {
    constructor() {
        super(...arguments);
        this.node = document.createElementNS(Global_1.SVGNS, 'g');
    }
    onDraw() {
        this.node.setAttribute('transform', `translate(${this.coord.x}, ${this.coord.y})`);
    }
}
exports.default = Container;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Handle from "./Handle";
const RenderableObject_1 = __webpack_require__(0);
const grid_1 = __webpack_require__(1);
const Container_1 = __webpack_require__(2);
const ns = 'http://www.w3.org/2000/svg';
class Handle extends RenderableObject_1.default {
    constructor() {
        super();
        this.node = document.createElementNS(ns, 'circle');
        this.radius = new grid_1.default(.5);
    }
    get width() {
        // this.width == this.height, they are all refer to radius
        return this.radius.mul(new grid_1.default(2));
    }
    get height() {
        // this.width == this.height, they are all refer to radius
        return this.radius.mul(new grid_1.default(2));
    }
    set width(val) {
        this.radius = val.div(new grid_1.default(2));
    }
    set height(val) {
        this.radius = val.div(new grid_1.default(2));
    }
    onDraw() {
        this.node.setAttribute('cx', this.coord.x.add(this.radius).toString());
        this.node.setAttribute('cy', this.coord.y.add(this.radius).toString());
        this.node.setAttribute('r', (this.radius.value).toString());
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
    onDraw() {
        this.node.setAttribute('x1', this.coord.x.toString());
        this.node.setAttribute('y1', this.coord.y.add(this.height.div(new grid_1.default(2))).toString());
        this.node.setAttribute('x2', (this.coord.x.add(this.width)).value.toString());
        this.node.setAttribute('y2', this.coord.y.add(this.height.div(new grid_1.default(2))).toString());
    }
}
exports.Path = Path;
function test(target, propertyKey, descriptor) {
    console.log('ee', target, propertyKey, descriptor);
}
;
const b = {};
function container(constructor) {
    // const ff = function () {
    //     this.call(constructor)
    // }
    // class ff extends constructor {
    //     node = document.createElementNS(SVGNS, 'g')
    //     constructor (...args: any[]) {
    //         super(args)
    //     }
    // }
    // class extends constructor {
    //     node = document.createElementNS(SVGNS, 'g')
    // }
    // ff.prototype.node = document.createElementNS(SVGNS, 'g')
    const onDraw = constructor.prototype.onDraw;
    constructor.prototype.onDraw = function () {
        this.node.setAttribute('transform', `translate(${this.coord.x}, ${this.coord.y})`);
        onDraw.call(this);
    };
    return constructor;
}
let Line = class Line extends Container_1.default {
    constructor() {
        super();
        this.leftHandle = new Handle;
        this.rightHandle = new Handle;
        this.path = new Path;
        this._width = new grid_1.default(1);
        this.addChild(this.path);
        // this.path.translate({
        //     x: this.path.coord.x,
        //     y: new Grid(0),//this.path.height.div(new Grid(2)),
        // })
        this.addChild(this.leftHandle);
        // this.leftHandle.translate({
        //     x: this.leftHandle.width,
        //     y: new Grid(0), //this.height.div(new Grid(2)),
        // })
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
                y: new grid_1.default(0),
            });
            this.path.width = l;
        }
    }
    onDraw() {
        if (this.node)
            this.node.setAttribute('style', 'stroke:black;stroke-width:2;fill:red');
        // super.onDraw()
    }
};
Line = __decorate([
    container
], Line);
exports.default = Line;


/***/ }),
/* 4 */
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
    onDraw() {
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
    onDraw() {
        this._detectCollision();
        super.onDraw();
    }
    _detectCollision() {
        // 
    }
}
exports.default = Railway;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Line_1 = __webpack_require__(3);
const Stage_1 = __webpack_require__(7);
const grid_1 = __webpack_require__(1);
const Railway_1 = __webpack_require__(4);
const Debug_1 = __webpack_require__(8);
const Time_1 = __webpack_require__(9);
const RenderableJob_1 = __webpack_require__(10);
// const l = new Line
const l2 = new Line_1.default;
const debugGrid = new Debug_1.DebugGrid;
const body = document.querySelector('body');
if (body) {
    const stage = new Stage_1.default(body, 500, 500);
    stage.addChild(debugGrid);
    const railway = new Railway_1.default;
    const l = new RenderableJob_1.LineJob();
    const labour = new RenderableJob_1.LabourIcon();
    const partener1 = new RenderableJob_1.LabourIcon();
    const partener2 = new RenderableJob_1.LabourIcon();
    const partener3 = new RenderableJob_1.LabourIcon();
    l.addOwner(labour);
    l.addPartener(partener1);
    l.addPartener(partener2);
    l.addPartener(partener3);
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
    // l.width = new Grid(5)
    l.devEnd.addDays(10);
    l.devStart.addDays(1);
    console.log(l);
    document.addEventListener('keyup', (e) => {
        if (e.keyCode == 40) {
            railway.translate({
                y: railway.coord.y.add(new grid_1.default(1)),
                x: railway.coord.x,
            });
        }
        else if (e.keyCode == 38) {
            railway.translate({
                y: railway.coord.y.sub(new grid_1.default(1)),
                x: railway.coord.x,
            });
        }
        if (e.keyCode == 37) {
            l.translate({
                x: l.coord.x.sub(new grid_1.default(1)),
                y: l.coord.y
            });
        }
        else if (e.keyCode == 39) {
            l.translate({
                x: l.coord.x.add(new grid_1.default(1)),
                y: l.coord.y
            });
        }
        stage.draw();
    });
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
    t.view.translate({
        x: t.view.coord.x,
        y: new grid_1.default(1),
    });
    Time_1.DateToCoord.globalTime = t;
    // t.travelForward()
    stage.addChild(t.view);
    stage.draw();
    setInterval(() => {
        // t.travelForward()
        // l.translate({x: l.coord.x.add(new Grid(1)), y: l.coord.y})
        // console.log(t.end)
        // l.devStart.addDays(1)
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SVGNS = 'http://www.w3.org/2000/svg';


/***/ }),
/* 7 */
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
    onDraw() {
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
    onDraw() {
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
const SuperDate_1 = __webpack_require__(12);
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
    onDraw() {
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
    onDraw() {
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
    afterDraw() {
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
        this.date = new SuperDate_1.default;
        if (d) {
            this.date = new SuperDate_1.default(d.getTime());
        }
    }
    addDayByNumber(d) {
        return new Day(new SuperDate_1.default(this.date.getTime() + d * 1000 * 60 * 60 * 24));
    }
    subDayByNumber(d) {
        return new Day(new SuperDate_1.default(this.date.getTime() - d * 1000 * 60 * 60 * 24));
    }
    forward() {
        this.date = new SuperDate_1.default(this.date.getTime() + 1000 * 60 * 60 * 24);
    }
    backward() {
        this.date = new SuperDate_1.default(this.date.getTime() - 1000 * 60 * 60 * 24);
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
        // pivot就是屏幕左边原点
        // 显示30天，前15，后15
        this.pivot = new Day(new SuperDate_1.default);
        this.pivotPos = 5;
        this.dayLength = 30;
        if (d) {
            if (d instanceof Day) {
                this.pivot = d;
            }
            else if (d instanceof SuperDate_1.default) {
                this.pivot = new Day(d);
            }
        }
        this.end = this.pivot.subDayByNumber(this.pivotPos);
        this.start = this.pivot.addDayByNumber(this.dayLength - this.pivotPos);
        this.updateDays();
    }
    updateDays() {
        if (this.end && this.start) {
            let pointer = new Day(new SuperDate_1.default(this.end.date.getTime()));
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
class Coordinate {
}
class Timer {
    updateDays() {
    }
    travelForward() {
    }
    travelBackward() {
    }
}
exports.Timer = Timer;
class WordCoordinate {
}
class TimeCoordCommander {
    constructor(timer, coord) {
        this.cbList = [];
        this.timer = timer;
        this.coord = coord;
    }
    updateDays() {
        if (this.timer && this.coord) {
        }
    }
    travelForward() {
    }
    travelBackward() {
    }
    notify(evt, arg) {
    }
    on(evt, cb) {
    }
}
exports.TimeCoordCommander = TimeCoordCommander;
class DateToCoord {
    static fromDateToCoord(date) {
        if (this.globalTime) {
            const pivotDate = this.globalTime.pivot.date;
            if (pivotDate.isAfter(date)) {
                return -1 * pivotDate.daysBetween2Date(date);
            }
            else {
                return pivotDate.daysBetween2Date(date);
            }
        }
        else {
            throw new Error('no globalTime');
        }
    }
}
DateToCoord.globalTime = null;
exports.DateToCoord = DateToCoord;
class TimeLine extends Container_1.default {
}
exports.TimeLine = TimeLine;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __webpack_require__(11);
const Labour_1 = __webpack_require__(13);
const Line_1 = __webpack_require__(3);
const RenderableObject_1 = __webpack_require__(0);
const grid_1 = __webpack_require__(1);
const Railway_1 = __webpack_require__(4);
const Time_1 = __webpack_require__(9);
class RenderableJob {
    constructor() {
        this.job = new Job_1.default('', '');
        this.view = null;
    }
}
exports.default = RenderableJob;
class Icon extends RenderableObject_1.default {
    constructor() {
        super();
        this.node = document.createElementNS(ns, 'circle');
        this.height = new grid_1.default(.5);
    }
    get width() {
        // this.width == this.height, they are all refer to radius
        return this.height;
    }
    set width(val) {
        this.height = val;
    }
    onDraw() {
        this.node.setAttribute('cx', this.coord.x.add(this.height).toString());
        this.node.setAttribute('cy', this.coord.y.add(this.height).toString());
        this.node.setAttribute('r', (this.height.value).toString());
    }
}
exports.Icon = Icon;
class LabourIcon extends Icon {
    constructor() {
        super(...arguments);
        this.labour = new Labour_1.default;
    }
}
exports.LabourIcon = LabourIcon;
const ns = 'http://www.w3.org/2000/svg';
class LineJob extends Line_1.default {
    constructor() {
        super(...arguments);
        this.job = new Job_1.default('', '');
        this.labours = [];
    }
    set devStart(date) {
        this.job.devStart = date;
    }
    set devEnd(date) {
        if (date.isBefore(this.devStart))
            throw new Error('结束日期不能超过开始日期');
        this.job.devEnd = date;
    }
    get devStart() {
        return this.job.devStart;
    }
    get devEnd() {
        return this.job.devEnd;
    }
    get testStart() {
        return this.job.testStart;
    }
    get testEnd() {
        return this.job.testEnd;
    }
    get release() {
        return this.job.release;
    }
    get integrationStart() {
        return this.job.integrationStart;
    }
    get integrationEnd() {
        return this.job.integrationEnd;
    }
    get finished() {
        return this.job.finished;
    }
    addOwner(owner) {
        this.job.addOwner(owner);
        this.labours[0] = owner;
        this.addChild(owner);
    }
    addPartener(partener) {
        if (this.labours.length == 0)
            throw new Error('必须有onwer');
        if (this.labours.filter(labour => {
            if (labour == partener) {
                return true;
            }
        }).length > 0) {
            throw new Error('不能重复添加');
        }
        this.job.addPartener(partener);
        this.labours.push(partener);
        this.addChild(partener);
    }
    onDraw() {
        const startPos = Time_1.DateToCoord.fromDateToCoord(this.devStart);
        this.width = new grid_1.default(this.devStart.daysBetween2Date(this.devEnd));
        this.translate({
            x: new grid_1.default(startPos),
            y: this.coord.y,
        });
        this.labours.forEach((labour, idx) => {
            labour.translate({
                x: (new grid_1.default(idx)).add(labour.width).sub(labour.width),
                y: new grid_1.default(1),
            });
        });
        super.onDraw();
    }
}
exports.LineJob = LineJob;
class JobRailway extends Railway_1.default {
    constructor() {
        super(...arguments);
        this.jobs = [];
    }
    addJob(job) {
        this.jobs.push(job);
        this.railway.addChild(job);
    }
}
exports.JobRailway = JobRailway;
// export class LineJob extends Container {
//     // jobs: Job[],
//     // labours: Labour[],
//     node: SVGGElement = document.createElementNS(ns, 'g')
//     railway: Railway = new Railway
//     jobs: JobLine[] = []
//     get width () {
//         return this.railway.width
//     }
//     set width (val: Grid) {
//         this.width = val
//         this.railway.width = val
//     }
//     constructor () {
//         super()
//         this.railway.translate({
//             x: new Grid(0),
//             y: new Grid(1),
//         })
//         this.height = new Grid(4)
//     }
//     _draw () {
//         this.node.setAttribute('cx', this.coord.x.toString())
//         this.node.setAttribute('cy', this.coord.y.toString())
//         this.node.setAttribute('r', (this.height.value).toString())
//     }
// }
// export class LineJob extends RenderableJob implements Renderable {
//     set coord (val: Coord) {
//         this.view.coord = val
//     }
//     get coord () {
//         return this.view.coord
//     }
//     set height (val: Grid) {
//         this.view.height = val
//     }
//     get height () {
//         return this.view.height
//     }
//     set width (val: Grid) {
//         this.view.height = val
//     }
//     get width () {
//         return this.view.height
//     }
//     view: Line = new Line
//     constructor (title: string, info: string) {
//         super()
//         this.job.title = title
//         this.job.info = info
//     }
//     addParent (parent: RenderableObject) {
//         this.view.addParent(parent)
//     }
//     removeParent () {
//         this.view.removeParent()
//     }
//     addChild (child: RenderableObject) {
//         this.view.addChild(child)
//     }
//     removeChild (target: RenderableObject) {
//         this.view.removeChild(target)
//     }
//     removeAll () {
//         this.view.removeAll()
//     }
//     getWorldPos (): Coord {
//         return this.view.getWorldPos()
//     }
//     translate (coord: Coord) {
//         this.view.translate(coord)
//     }
//     draw () {
//         this.view.draw()
//     }
// }
// class IconJob {
// }


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SuperDate_1 = __webpack_require__(12);
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
class Schedule {
    constructor() {
        this.devStart = new SuperDate_1.default;
        this.devEnd = new SuperDate_1.default;
        this.testStart = new SuperDate_1.default;
        this.testEnd = new SuperDate_1.default;
        this.release = new SuperDate_1.default;
        this.integrationStart = new SuperDate_1.default;
        this.integrationEnd = new SuperDate_1.default;
        this.finished = new SuperDate_1.default;
    }
}
exports.Schedule = Schedule;
class Job {
    constructor(title, info, start, end) {
        this.status = JobStatus.None;
        this.schedule = new Schedule;
        this.type = JobType.Default;
        this.title = '';
        this.info = '';
        if (!start)
            this.devStart = new SuperDate_1.default;
        this.initSchedule(start, end);
    }
    set devStart(date) {
        this.schedule.devStart = date;
    }
    set devEnd(date) {
        if (date.isBefore(this.devStart))
            throw new Error('结束日期不能超过开始日期');
        this.schedule.devEnd = date;
    }
    set testStart(date) {
    }
    set testEnd(date) {
    }
    set release(date) {
    }
    set integrationStart(date) {
    }
    set integrationEnd(date) {
    }
    set finished(date) {
    }
    get devStart() {
        return this.schedule.devStart;
    }
    get devEnd() {
        return this.schedule.devEnd;
    }
    get testStart() {
        return this.schedule.testStart;
    }
    get testEnd() {
        return this.schedule.testEnd;
    }
    get release() {
        return this.schedule.release;
    }
    get integrationStart() {
        return this.schedule.integrationStart;
    }
    get integrationEnd() {
        return this.schedule.integrationEnd;
    }
    get finished() {
        return this.schedule.finished;
    }
    initSchedule(start, end) {
        if (start) {
            this.devStart = start;
        }
        if (end) {
            this.devEnd = end;
        }
        else {
            this.devEnd.update(this.devStart).addDays(1);
        }
    }
    // owner: Owner | null = null
    // partener: Partener[] | null = null
    addOwner(owner) {
    }
    addPartener(partener) {
    }
}
exports.default = Job;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SuperDate extends Date {
    subDays(days) {
        if (days < 0)
            throw new Error('no negative');
        this.setTime(this.getTime() + days * 1000 * 60 * 60 * 24);
    }
    addDays(days) {
        if (days < 0)
            throw new Error('no negative');
        this.setTime(this.getTime() + days * 1000 * 60 * 60 * 24);
    }
    daysBetween2Date(date) {
        return Math.abs((this.getTime() - date.getTime()) / 24 / 60 / 60 / 1000);
    }
    isBefore(date) {
        if (this.getTime() >= date.getTime()) {
            return false;
        }
        else {
            return true;
        }
    }
    isAfter(date) {
        if (this.getTime() <= date.getTime()) {
            return false;
        }
        else {
            return true;
        }
    }
    update(date) {
        this.setTime(date.getTime());
        return this;
    }
}
exports.default = SuperDate;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Sex;
(function (Sex) {
    Sex[Sex["Man"] = 0] = "Man";
    Sex[Sex["Woman"] = 1] = "Woman";
})(Sex = exports.Sex || (exports.Sex = {}));
class Labour {
    constructor() {
        // jobs
        this.jobs = [];
        this.name = '';
        this.givenName = '';
        this.familyName = '';
        this.sex = Sex.Man;
    }
    addJob() {
    }
    removeJob() {
    }
}
exports.default = Labour;


/***/ })
/******/ ]);