function isReversible(number) {
    var num = reverseSum(number).toString().split('')

    if (number.toString().split('')[0] === '0') {
        return false
    }

    if (number.toString().split('')[num.length - 1] === '0') {
        return false
    }

    for (var i = 0; i < num.length; i++) {
        if (num[i] % 2 === 0)
            return false
    }

    return true
}

function reverseSum(number) {
    return number + parseInt(number.toString().split('').reverse().join(''))

}
var reversible = 0

var max = 1000000000;
var benchmark = 0
var benchDistance = max / 1000;
// var length = (max - 1).toString().length
for (var n = 1; n < max; n++) {
    if (isReversible(n)) {
        // console.log(n)
        reversible++
    }
    if (n > benchmark) {
        console.log(benchmark + ':done')
        benchmark += benchDistance
    }
}
console.log(reversible)
