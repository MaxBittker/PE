var isp2 = function(n) {
    var cpt = 2
    while (n > cpt) {
        console.log(cpt)
        if ((n % cpt) === 0)
            return true
        cpt *= 2
    }
    return false
}

console.log(isp2(process.argv[2]))
