"use strict";

var numtoBinary = (val, length) => {
    var binary = []
    while (val > 0) {
        if (val % 2 === 1)
            binary.push(1)
        else
            binary.push(0)
        val /= 2
        val |= 0
    }
    return binary
}

var subsets = (set) => {
    var subsets = []
    for (var s = 0; s < Math.pow(2, set.length); s++) {
        var pattern = numtoBinary(s)
        var subset = []
        for (var i = 0; i < pattern.length; i++) {
            if (pattern[i] === 1)
                subset.push(set[i])
        }
        subsets.push(subset.join(""))
    }
    return subsets
}

// console.log(subsets([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
console.log(subsets("max".split("")).join(" "))
    // 
var powerset = set => {
    var sets = []
    if (set.length > 0){
    	console.log(set)
        sets.push(set.join(""))
    }

    set.forEach(element => {
        var clone = set.slice(0)
        var e = clone.splice(clone.indexOf(element), 1)
            // console.log(sets)
        sets = sets.concat(powerset(clone))
    })

    return (sets)
}

console.log(powerset("max".split("")).join(" "))
