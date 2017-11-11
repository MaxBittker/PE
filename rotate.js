"use strict";
function createArray(n, m) {
    var table = new Array(n)
    var cols, rows;
    for (cols = 0; cols < n; cols++) {
        table[cols] = new Array(m)
        for (var rows = 0; rows < m; rows++) {
            table[cols][rows] = .5 < (Math.tan(1+cols*rows)) ? "▒" : " "
        }

    }
    return table
}

var table = createArray(30, 30)
    // table[0][0] = 1
    // table[0][2] = 2
    // table[2][1] = 3

function rotate(A) {
    var n = A.length
    var m = A[0].length

    var newTable = createArray(m, n)
    for (var x = 0; x < m; x++) {
        for (var y = 0; y < n; y++) {
            newTable[x][y] = A[y][m - x - 1] //[n - x - 1]
        }
    }
    return newTable
}

function prettyPrint(A) {
    for (var y = 0; y < A.length; y++) {
        var rowstr = ""
        for (var x = 0; x < A[0].length; x++) {
            rowstr += A[y][x] + ""
        }
        console.log(rowstr)
    }
}

// }
// prettyPrint(table)

// var table = rotate(table)
// console.log()
// prettyPrint(table)
// }
// var table = rotate(table)
// console.log()
// prettyPrint(table)

// var table = rotate(table)
// console.log()
// prettyPrint(table)


function loop(A) {
    var A = rotate(A)
    prettyPrint(A)

    setTimeout(()=>loop(A), 200);
}

loop(table)
    // while (true) {
    //     var table = rotate(table)
    //     prettyPrint(table)
    //         // console.log(table)
    // }
    // //
