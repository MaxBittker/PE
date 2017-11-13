
extern crate primal;
extern crate num;

use num::FromPrimitive;
use num::bigint::BigInt;
use num::ToPrimitive;

use num::rational::{Ratio, BigRational};

fn approx_sqrt(number: usize, iterations: usize) -> BigRational {
    let start: Ratio<BigInt> = Ratio::from_integer(FromPrimitive::from_usize(number).unwrap());
    let mut approx = start.clone();

    for _ in 0..iterations {
        approx = (&approx + (&start / &approx)) /
            Ratio::from_integer(FromPrimitive::from_usize(2).unwrap());
    }

    return approx
}
// It was proposed by Christian Goldbach that every odd composite number can be written as the sum of a prime and twice a square.

// 9 = 7 + 2×12
// 15 = 7 + 2×22
// 21 = 3 + 2×32
// 25 = 7 + 2×32
// 27 = 19 + 2×22
// 33 = 31 + 2×12

// It turns out that the conjecture was false.

// What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?


fn divisible_by(n: usize, d:usize) ->bool {
    return n % d == 0;
}

fn check_conjecture(n:usize)-> bool{
    let primes = primal::Primes::all().take_while(|p| *p < n);
    for p in primes{
        let rem = (n - p) / 2;
        
        let upper_limit: usize =approx_sqrt(rem, 8).to_integer().to_usize().unwrap();
        
        for s in 1..upper_limit+1{
            if s * s == rem{
                return true
            } 
        }
    }
    return false
}

fn main(){
    
     for n in 4590.. {
        if !primal::is_prime(n) && n%2==1{
            let conj = check_conjecture(n as usize);
            println!("{}: {}", n, conj);
            if !conj{
                break;                
            }
    }
        
        
        // if divisible_by(v, n){
            // println!("CANDIDATE: {}", n);
        // } else {
            // println!("{}", n);
        // }
    }

}
