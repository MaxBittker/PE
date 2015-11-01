function isReversible(number) {
    var num = reverseNumber(number) + number

    if (number % 10 === 0) {
        return false
    }

    while (num > 0) {
        if ((num % 10) % 2 === 0)
            return false
        num = (num / 10) | 0
    }

    return true
}

function reverseNumber(num) {
    var reverse = 0
    while (num > 0) {
        reverse = (10 * reverse) + num % 10
        num = (num / 10) | 0
    }
    return reverse
}


var reversible = 0

var max = 1000000000;
var benchmark = 0
var benchDistance = max / 100;
console.time('b')
for (var n = 1; n < max; n+=2) {
    if (isReversible(n)) {
        // console.log(n)
        reversible++
    }
    if (n > benchmark) {
        console.log(benchmark / benchDistance + ':done')
        benchmark += benchDistance
    }
}
console.log(reversible*2)
console.timeEnd('b')
