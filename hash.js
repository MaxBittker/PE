"use strict";
function hashmap(size) {
    this.dict = new Array(size);
    for (var i = this.dict.length - 1; i >= 0; i--) {
        this.dict[i] = []
    };
}

hashmap.prototype = {

    hash: function(value) {
        return ((value * (value + 3)) * 1017199) % this.dict.length
    },

    add: function(key, value) {
        var bin = this.dict[this.hash(key)]
        if (bin !== undefined) {
            for (var i = bin.length - 1; i >= 0; i--) {
                if (bin[i].key === key) {
                    bin[i] = { //update
                        key, value
                    }
                    return
                }
            }
        }
        bin.push({
            key, value
        })

    },

    lookup: function(key) {
        var bin = this.dict[this.hash(key)]

        if (bin.length === 1 && bin[0].key === key)
            return bin[0].value
        else
            for (var i = bin.length - 1; i >= 0; i--) {
                if (bin[i].key === key) {
                    return bin[i].value
                }
            }
    }
}


var hm = new hashmap(1000)

for (var i = 0; i <= 1000; i++) {
    if (hm.lookup(i) !== undefined)
        console.log(i + ' false positive')

    hm.add(i, {
        field: i * 10
    })

    if (hm.lookup(i).field !== i * 10)
        console.log(i + ' false negative')

};
var chains = hm.dict.map((item) => item.length)

console.log(chains.join(" "))
