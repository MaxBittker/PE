"use strict";
var heap = function(pred) {
    this.pred = pred
    this.array = [this.pred(Number.NEGATIVE_INFINITY, Infinity) ? Infinity : Number.NEGATIVE_INFINITY]
}
heap.prototype = {
    add: function(element) {
        var loc = this.array.length
        this.array[loc] = element
        while (this.pred(this.array[this.parent(loc)], element)) {
            this.swap(loc, this.parent(loc))
            loc = this.parent(loc)
        }
    },
    popRoot: function() {
        var retValue = this.array[1]

        this.swap(1, this.array.length - 1)

        this.array.pop()
        this.heapify(1)

        return retValue
    },
    swap: function(l1, l2) {
        var save = this.array[l1];
        this.array[l1] = this.array[l2]
        this.array[l2] = save

    },
    heapify: function(loc) {
        var c1 = (loc * 2)
        var c2 = (loc * 2) + 1
        if (this.array[c2] === undefined)
            var next = null

        if (this.pred(this.array[loc], this.array[c1])) {
            if (!this.pred(this.array[c1], this.array[c2]) || this.array[c2] === undefined) {
                this.swap(loc, c1)
                next = c1
            } else {
                this.swap(loc, c2)
                next = c2

            }
        } else if (this.pred(this.array[loc], this.array[c2])) {
            this.swap(loc, c2)

            next = c2
        }

        if (next != null)
            this.heapify(next)

    },
    parent: function(loc) {
        return (Math.floor(loc / 2))
    },
    peek: function() {
        return this.array[1]
    },
    popAll: function() {
        var res = new Array()
            // console.log(this.array)
        this.array.slice(1).forEach((item, i) => {
            res.push(this.popRoot())
        })
        return res
    },
    DFtraverse: function(start) {
        if (start === 1)
            console.log(this.array[start])

        var c1 = start * 2
        var c2 = (start * 2) + 1
        if (this.array[c1] !== undefined)
            console.log(this.array[c1])

        if (this.array[c2] !== undefined)
            console.log(this.array[c2])

        if (this.array[c1] !== undefined)
            this.DFtraverse(c1)

        if (this.array[c2] !== undefined)
            this.DFtraverse(c2)
    },
    bfTraverse: function(start) {
        var queue = []
        var res = []

        var current = start

        res.push(this.array[current])

        var c1 = start * 2
        var c2 = (start * 2) + 1
        if (this.array[c1] !== undefined)
            queue.push(c1)
        if (this.array[c2] !== undefined)
            queue.push(c2)

        while (queue.length > 0) {
            // console.log(queue)
            current = queue.shift()
            res.push(this.array[current])

            var c1 = current * 2
            var c2 = (current * 2) + 1

            if (this.array[c1] !== undefined)
                queue.push(c1)
            if (this.array[c2] !== undefined)
                queue.push(c2)

        }
        return res
    }


}
var minH = new heap((a, b) => a > b)
var maxH = new heap((a, b) => a < b)

var l = 15
for (var i = 1; i < l; i++) {
    var val = (Math.random() * 10) | 0
    minH.add(val)
    maxH.add(val)
        // console.log(val, minH.array.slice(1))
}
// H.DFtraverse(1)
// console.log(minH.bfTraverse(1))
// console.log(minH.DFtraverse(1))

// console.log(maxH.bfTraverse(1))

console.log(minH.popAll())
console.log(maxH.popAll())
