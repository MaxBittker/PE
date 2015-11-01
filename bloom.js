function bloomFilter(size, n) {
    this.filter = new Array(size)
    this.primes = [1017179, 1017193, 1017199, 1017209, 1017227, 1017277, 1017293, 1017299, 1017301, 1017307, 1017311, 1017319, 1017323, 1017329, 1017347, 1017353, 1017361, 1017371, 1017377, 1017383, 1017391, 1017437, 1017439, 1017449, 1017473, 1017479, 1017481, 1017539, 1017551, 1017553, 1017559, 1017607, 1017613, 1017617, 1017623, 1017647, 1017649, 1017673, 1017683, 1017703, 1017713, 1017719, 1017721, 1017749, 1017781, 1017787, 1017799, 1017817, 1017827, 1017847, 1017851, 1017857, 1017859, 1017881, 1017889, 1017923, 1017953, 1017959, 1017997, 1018007, 1018019, 1018021, 1018057, 1018091, 1018097, 1018109, 1018123, 1018177, 1018201, 1018207, 1018217, 1018223, 1018247, 1018253, 1018271, 1018291, 1018301, 1018309, 1018313, 1018337, 1018357, 1018411, 1018421, 1018429, 1018439, 1018447, 1018471, 1018477, 1018489, 1018513].slice(0, n)

}

bloomFilter.prototype = {
    hash: function(value, m) {
        return ((value * (value + 3)) * this.primes[m]) % this.filter.length
    },

    add: function(value) {
        for (var m = 0; m < this.primes.length; m++) {
            this.filter[this.hash(value, m)] = 1
        }
    },

    check: function(value) {
        var res = true //probably here
        for (var m = 0; m < this.primes.length; m++) {
            if (this.filter[this.hash(value, m)] === undefined) {
                res = false //not here
            }
        }
        return res
    }
}

var count = 10000
var ratio = 350
var bf = new bloomFilter(count * ratio, .7*ratio|0)

var error = 0
var value = 0
for (var test = 0; test < count; test++) {
    value += 1 + (Math.random() * 100 | 0)

    if (bf.check(value))
        error++
        bf.add(value)
    if (!bf.check(value))
        console.log('false negative')

}
console.log(100 * error / count)
