"use strict";
function makeBoard(m, n) {
    var board = new Array(m)
    for (var col = 0; col < m; col++) {
        board[col] = new Array(n)
        for (var row = 0; row < n; row++) {
            board[col][row] = Math.random() < .5
        }
    }
    return board
}

function prettyPrint(board) {
    var w = board.length
    var h = board[0].length

    for (var y = 0; y < h; y++) {
        var rowstr = ""
        for (var x = 0; x < w; x++) {
            rowstr += board[x][y] ? "▒" : " "
        }
        console.log(rowstr)
    }

}

function update(board) {

    var w = board.length
    var h = board[0].length
    var newBoard = makeBoard(w, h)

    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            newBoard[x][y] = updatePoint(board, {
                x: x,
                y: y
            })

        }
    }
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            board[x][y] = newBoard[x][y]
        }
    }

    return newBoard
}

function updatePoint(board, point) {
    var neighbors = []
    var isAlive = false
        // console.log(point)
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) {
                isAlive = board[point.x][point.y]
                continue
            }
            var newpoint = {
                x: point.x + dx,
                y: point.y + dy
            }
            var wrappedpoint = {
                x: wrap(newpoint.x, board.length),
                y: wrap(newpoint.y, board[0].length)
            }

            if (doeswrap(newpoint.x, board.length) || doeswrap(newpoint.y, board[0].length)) {
                // if (wrappedpoint.x === point.x && wrappedpoint.y === point.y)
                // continue;
            } else {

                // continue;

                if (board[newpoint.x][newpoint.y])
                    neighbors.push(newpoint)
            }
        }
    }
    // console.log(neighbors.length)
    if (isAlive) {
        if (neighbors.length > 3)
            return false
        if (neighbors.length < 2)
            return false
        return true
    } else {
        if (neighbors.length === 3)
            return true
        else
            return false
    }
}


function wrap(x, limit) {
    return ((x + limit) % limit)
}

function doeswrap(x, limit) {
    return (x != ((x + limit) % limit))
}
var B = makeBoard(200, 50)


// var B = makeBoard(2, 2)

// prettyPrint(B)
// console.log()

function tick(board) {
    prettyPrint(board)
    var newboard = update(board)
    console.log()
    setTimeout(() => tick(newboard), 100)

}
tick(B)
    // var B = makeBoard(3, 5)
    // prettyPrint(B)
    // console.log()
    // 
    // var B = makeBoard(5, 3)
    // prettyPrint(B)



// given array with 3 numbers 
// (quarters, nickles, dimes)

// given amt: $1.10

// determine if you can cread
