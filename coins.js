"use strict";

var change = (value, q, d, n) => {

    var qn = fitn(value, 25)
    qn = Math.min(qn, q)
    value -= qn * 25

    var dn = fitn(value, 10)
    dn = Math.min(dn, d)
    value -= dn * 10

    var nn = fitn(value, 5)
    nn = Math.min(nn, n)
    value -= nn * 5

    return value
}

var fitn = (value, coin) => {
    var n = value / coin
    n |= 0
    return (n)
}
console.log(
    change(110, 2, 2, 2)
)
