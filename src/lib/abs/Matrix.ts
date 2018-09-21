import { Matrix } from "../interface/Matrix";
import { Serializable } from "../interface/Serializable";

export abstract class AbsMatrix implements Matrix, Serializable {
    data: Array<Array<number>>
    mutiply (m2: Matrix) {
        const m1 = this
        const rowNumber = m1.data.length
        const columnNumber = m2.data[0].length
        const result:Array<Array<number>> = []
        for (let i = 0; i < rowNumber; i++) {
            for (let j = 0; j < columnNumber; j++) {
                if (j == 0) result.push([0])
                result[i][j] = m1.data[i].reduce((foo, rowItem, rowIdx) => {
                    // i行 * j列
                    const columnItem = m2.data[rowIdx][j]
                    foo += rowItem * columnItem
                    return foo
                }, 0)
                
            }
        }
        this.data = result
    }
    toObject () : any {

    }
    toString () : string {
        function space (num: number) : string {
            let r = ''
            for (let i = 0; i < num; i++) {
                r += ' '
            }
            return r
        }
        let result = ''
        for (let i = 0; i < this.data.length; i++) {
            result += `row${i + 1}: `
            for (let j = 0; j < this.data[i].length; j++) {
                const num = `${this.data[i][j].toFixed(2)}`
                result += num
                result += space(10 - num.length)
            }
            result += '\n'
        }
        return result
    }
}