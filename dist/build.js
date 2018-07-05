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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.parent = null;
        this.children = new Set;
    }
    beforeDraw(ctx) {
        ctx.save();
    }
    draw(ctx) {
        this.beforeDraw(ctx);
        this.transform();
        this.children.forEach(child => {
            child.draw(ctx);
        });
        this.afterDraw(ctx);
    }
    afterDraw(ctx) {
        ctx.restore();
    }
    add(child) {
        this.children.add(child);
    }
    remove(child) {
        this.children.delete(child);
    }
    move(pos) { }
    moveX(distance) { }
    moveY(distance) { }
    moveTo(pos) { }
    transform() {
    }
}
exports.Container = Container;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Point {
    constructor(pos) {
        this.x = 0;
        this.y = 0;
        if (pos) {
            const { x, y } = pos;
            this.init({ x, y });
        }
    }
    init({ x, y } = { x: 0, y: 0 }) {
        this.x = x;
        this.y = y;
    }
    toObject() {
        return {
            x: this.x,
            y: this.y,
        };
    }
    toString() {
        return `x: ${this.x}, y:${this.y}`;
    }
    move(pos) { }
    moveX(distance) { }
    moveY(distance) { }
    moveTo(pos) { }
    transform() {
    }
}
exports.Point = Point;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(1);
const global_1 = __webpack_require__(3);
const Container_1 = __webpack_require__(0);
class Tile extends Container_1.Container {
    constructor() {
        super();
        this.parent = null;
        this.children = new Set;
        this.points = [];
        this.x = 0;
        this.y = 0;
        // 1  2
        // 4  3
        const unit = global_1.Global.unit;
        const lt = new Point_1.Point({ x: 0, y: 0 });
        const rt = new Point_1.Point({ x: unit, y: 0 });
        const rb = new Point_1.Point({ x: unit, y: unit });
        const lb = new Point_1.Point({ x: 0, y: unit });
        this.points = [lt, rt, rb, lb];
    }
    get width() {
        return this.points.length > 0 ? Math.abs(this.points[0].x - this.points[1].x) : 0;
    }
    get height() {
        return this.points.length > 0 ? Math.abs(this.points[0].y - this.points[3].y) : 0;
    }
    get position() {
        return {
            x: this.x,
            y: this.y,
        };
    }
    init(points) {
        this.points = points;
    }
    add(child) {
        this.children.add(child);
    }
    remove(child) {
        this.children.add(child);
    }
    move(pos) {
        const { x, y } = pos;
        this.moveTo({
            x: this.x + x,
            y: this.y + y,
        });
    }
    moveX(distance) {
        this.moveTo({
            x: this.x + distance,
            y: this.y,
        });
    }
    moveY(distance) {
        this.moveTo({
            x: this.x,
            y: this.y + distance,
        });
    }
    moveTo(pos) {
        const { x, y } = pos;
        const width = this.width;
        const height = this.height;
        this.points[0].x = x;
        this.points[0].y = y;
        this.points[1].x = x + width;
        this.points[1].y = y;
        this.points[2].x = x + width;
        this.points[2].y = y + height;
        this.points[3].x = x;
        this.points[3].y = y + height;
    }
    draw(ctx) {
        this.beforeDraw(ctx);
        ctx.beginPath();
        ctx.moveTo(this.x + this.points[0].x, this.y + this.points[0].y);
        ctx.lineTo(this.x + this.points[1].x, this.y + this.points[1].y);
        ctx.lineTo(this.x + this.points[2].x, this.y + this.points[2].y);
        ctx.lineTo(this.x + this.points[3].x, this.y + this.points[3].y);
        ctx.lineTo(this.x + this.points[0].x, this.y + this.points[0].y);
        ctx.stroke();
        this.afterDraw(ctx);
    }
    transform() {
    }
}
exports.Tile = Tile;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Global;
(function (Global) {
    Global[Global["unit"] = 40] = "unit";
})(Global = exports.Global || (exports.Global = {}));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(1);
const Tile_1 = __webpack_require__(2);
const Line_1 = __webpack_require__(5);
const Stage_1 = __webpack_require__(6);
const stage = new Stage_1.Stage({
    width: 1000,
    height: 700,
});
document.body.appendChild(stage.getViewport());
const tile = new Tile_1.Tile;
const tile2 = new Tile_1.Tile;
const line = new Line_1.Line;
stage.add(line);
stage.add(tile);
let angle = 0;
let i = 5;
let direction = 1;
stage.render();
line.grow();
line.grow();
line.grow();
line.grow();
line.grow();
line.grow();
line.grow();
line.grow();
stage.onRenderFrame(() => {
    angle += 10;
    const radian = Math.PI / 180 * angle;
    const x = 100 * Math.cos(radian) + 100;
    const y = 100 * Math.sin(radian) + 100;
    // if (direction == 1) {
    //     i++
    //     if (i == 10) {
    //         direction = 0
    //     }
    //     line.grow()
    // }
    line.moveX(1);
    // if (direction == 0) {
    //     i--
    //     if (i == 0) {
    //         direction = 1
    //     }
    //     line.shrink()
    // }
    tile.moveTo(new Point_1.Point({
        x,
        y,
    }));
    tile2.moveTo({
        x: x + 200,
        y: y + 200,
    });
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __webpack_require__(3);
const Tile_1 = __webpack_require__(2);
const Container_1 = __webpack_require__(0);
class Line extends Container_1.Container {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.height = 1;
        this.parent = null;
        this.children = new Set;
        this.tiles = [];
        const tile = new Tile_1.Tile;
        this.grow();
    }
    get width() {
        return this.children.size * global_1.Global.unit;
    }
    grow() {
        const tile = new Tile_1.Tile;
        tile.moveTo({
            x: this.x + this.width,
            y: this.y
        });
        this.children.add(tile);
        this.tiles.push(tile);
    }
    shrink() {
        this.children.delete(this.tiles.pop());
    }
    beforeDraw(ctx) {
        ctx.save();
    }
    draw(ctx) {
        this.beforeDraw(ctx);
        this.children.forEach(item => {
            // item.transform()
            item.draw(ctx);
        });
        this.afterDraw(ctx);
    }
    afterDraw(ctx) {
        ctx.restore();
    }
    transform() {
    }
    move(pos) { }
    moveX(distance) {
        this.x += distance;
    }
    moveY(distance) { }
    moveTo(pos) { }
}
exports.Line = Line;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = __webpack_require__(0);
class Root extends Container_1.Container {
    constructor() {
        super(...arguments);
        this.x = 0;
        this.y = 0;
        this.parent = null;
        this.children = new Set;
    }
    beforeDraw(ctx) {
        ctx.save();
    }
    draw(ctx) {
        this.beforeDraw(ctx);
        this.children.forEach(child => child.draw(ctx));
        this.afterDraw(ctx);
    }
    afterDraw(ctx) {
        ctx.restore();
    }
    add(child) {
        this.children.add(child);
    }
    remove(child) {
        this.children.delete(child);
    }
    move(pos) { }
    moveX(distance) { }
    moveY(distance) { }
    moveTo(pos) { }
}
class Stage {
    constructor({ height = 0, width = 0 }) {
        this.cbList = [];
        this.height = height;
        this.width = width;
        this.canvas = document.createElement('canvas');
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        window.requestAnimationFrame(() => { this.render(); });
        this.root = new Root;
    }
    getViewport() {
        return this.canvas;
    }
    getContext() {
        return this.canvas.getContext('2d');
    }
    add(child) {
        this.root.children.add(child);
    }
    remove(child) {
        this.root.children.delete(child);
    }
    render() {
        this.getContext().clearRect(0, 0, this.width, this.height);
        this.cbList.forEach(cb => cb());
        this.root.draw(this.getContext());
        window.requestAnimationFrame(() => { this.render(); });
    }
    onRenderFrame(cb) {
        this.cbList.push(cb);
    }
}
exports.Stage = Stage;


/***/ })
/******/ ]);