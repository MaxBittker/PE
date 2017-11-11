"use strict";
var d7count = -1
var entries = -1
    // var d7count = 0

var genPT = function(n) {
    var rows = []

    for (var l = 0; l < n; l++) {
        var row = new Array(l)
        row[0] = 1
        row[l] = 1
        d7count += 2
        entries += 2

        for (var p = 1; p < l; p++) {
            row[p] = (rows[(l - 1) % 2][p - 1] + rows[(l - 1) % 2][p]) % 7
            entries++
            if (row[p] !== 0)
                d7count++

        }
        rows[l % 2] = row.slice(0)
        if (l % (n / 100) === 0)
            console.log(d7count / entries)

        // ratio(row)
        // printRow(row)
    }
    return rows
}

var printRow = function(row) {
    console.log(row.map(v => v === 0 ? ' ' : "#").join(" "))
}

var ratio = function(row) {
    console.log(row.filter(item => item !== 0).length / row.length)
}

var pt = genPT(1000 * 1000)
    // countd7(genPT(7))
    // printPT(pt)
    // console.log(d7count, entries)
    //  	 1
    //   	 1 	  	 1
    //     	 1 	  	 2 	  	 1
    //     	 1 	  	 3 	  	 3 	  	 1
    //    	 1 	  	 4 	  	 6 	  	 4 	  	 1
    //   	 1 	  	 5 	  	10 	  	10 	  	 5 	  	 1
    // 		 1 	  	 6 	  	15 	  	20 	  	15 	  	 6 	  	 1
