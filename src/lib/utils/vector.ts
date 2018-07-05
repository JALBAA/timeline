import { Matrix33 } from "./matrix";
import { AbsMatrix } from "../abs/Matrix";

export class Vector extends AbsMatrix{
    get x () : number {
        return this.matrix[0][0]
    }
    set x (v: number) {
        this.matrix[0][0] = v
    }
    get y () : number {
        return this.matrix[0][1]
    }
    set y (v: number) {
        this.matrix[0][1] = v
    }
    matrix: Array<Array<number>> = [[0,0,1]]
}