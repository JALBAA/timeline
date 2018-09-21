import { Matrix33 } from "./matrix";
import { AbsMatrix } from "../abs/Matrix";

export class Vector extends AbsMatrix{
    get x () : number {
        return this.data[0][0]
    }
    set x (v: number) {
        this.data[0][0] = v
    }
    get y () : number {
        return this.data[0][1]
    }
    set y (v: number) {
        this.data[0][1] = v
    }
    data: Array<Array<number>> = [[0,0,1]]
}