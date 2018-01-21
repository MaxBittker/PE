"use strict";
function mergeSort(arr, pred) {
    if (pred === undefined) {
        pred = (l, r) => {
            return l < r
        }
    }
    if (arr.length === 1)
        return arr

    var midpoint = arr.length / 2 | 0

    var lhs = mergeSort(arr.slice(0, midpoint), pred)
    var rhs = mergeSort(arr.slice(midpoint, arr.length), pred)

    var l = 0,
        r = 0
    var newArr = []

    while (true) {
        if (lhs[l] === undefined) {
            return newArr.concat(rhs.slice(r))
        }
        if (rhs[r] === undefined) {
            return newArr.concat(lhs.slice(l))
        }

        if (
            pred(lhs[l], rhs[r])
        ) {
            newArr.push(lhs[l])
            l++
        } else {
            newArr.push(rhs[r])
            r++
        }
    }

}

function quickSort(arr, pred) {
    arr = arr.slice(0)

    if (pred === undefined) {
        pred = (l, r) => {
            return l < r
        }
    }

    if (arr.length <= 1)
        return arr

    var rhs = [],
        lhs = [],
        pivot = arr.splice(arr.length / 2 | 0, 1)

    arr.forEach((element) => {
        if (pred(element, pivot))
            lhs.push(element)
        else
            rhs.push(element)
    })

    return (quickSort(lhs, pred).concat(pivot, quickSort(rhs, pred)))


}

var a = []
for (var i = 15; i >= 0; i--) {
    a.push(Math.random() * 100 | 0)
};

console.log(a)

console.log(mergeSort(a))
console.log(quickSort(a))

console.log(mergeSort(a, (l, r) => {
    return l > r
}))

console.log(quickSort(a, (l, r) => {
    return l > r
}))
