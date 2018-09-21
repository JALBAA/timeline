import {Matrix} from '../interface/Matrix'
import { AbsMatrix } from '../abs/Matrix';

export class Matrix33 extends AbsMatrix {
    data: Array<Array<number>> = [
        [1,0,0],
        [0,1,0],
        [0,0,1]
    ]
}
export class Matrix32 extends AbsMatrix {
    data: Array<Array<number>> = [
        [1,0,0],
        [0,1,0]
    ]
}   