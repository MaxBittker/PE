package main

import (
	"fmt"
	"math/big"
)

func main() {
    b:= 109300
    c:= 126300
    d:= 2
    e:= 2
    f:= 1
    h:= 0
    cycle:= 0
    
    B5:
    d = 2
    f = 1
    
	// B4:
	e = 2   
		// B3:
		xxx := big.NewInt(int64(b))
		isPrime := xxx.ProbablyPrime(20)
        if !isPrime{
            f = 0  
        }
        
        e++     
        if e != b{
			// goto B3
		}
    
	d++
	
	if d != b {
		// goto B4
	}
        
    if f == 0{
        h++
    }
	cycle++
	fmt.Println(cycle)
	
    if b == c {
        fmt.Println(h)
        
    } else {
        b += 17
        goto B5
    }
}
