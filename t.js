let p = 5000
let l = 0.05
function year (p, n, sum) {
    sum += p * 12
    if (n > 0) {
        return year(p + p * l, n - 1, sum)
    } else {
        return [p, sum]
    }
}

// - 214w + 850w + 60w = 696 ~ 700
console.log(year(p, 20, 0))


// 300w

let tp = 3000000
let tl = 0.02

function tyear (tp, n) {
    if (n > 0) {
        return tyear(tp + tp * tl, n - 1)
    } else {
        return tp
    }
}
// d: 345w
// x - 345w + 620w = x + 275 (x must >= 425(0.02 is bearly ok))
console.log('tyear', tyear(tp, 20))



const gz = 20000
const gz2 = (20000 - 11000)
l = 0
console.log(gz, gz2)

function shouyi (gz, years, sum, lilv) {
    sum += (sum + gz * 12) * lilv
    if (years > 0) {
        return shouyi(gz, years - 1, sum, lilv)
    } else {
        return sum
    }
}
console.log('gz1', shouyi(gz, 20, 0, 0.05))
console.log('gz2', shouyi(gz2, 20, 0, 0.05))