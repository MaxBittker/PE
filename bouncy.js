function isBouncy(number) {
    var inc = isDirectional(number, 'increasing')
    var dec = isDirectional(number, 'decreasing')
    // console.log(inc, dec)
    return (inc && dec)
}

function isDirectional(number, dir) {
    var num = number.toString()
    // console.log(num)
    var last = number[0]

    for (var i = 0; i < num.length; i++) {
        var current = num[i]
        if ((last > current) && dir === "increasing")
            return true
        if ((last < current) && dir === "decreasing")
            return true
        last = current
    }
    return false

}

var bouncy = 0
var ratio = 0
var current = 0
var target = .99

while(ratio < target){
	current++

    if (isBouncy(current))
        bouncy++

    ratio = bouncy/current
}

console.log(current)
