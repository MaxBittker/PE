extern crate num;
extern crate primal;
// use num::bigint::*;

// The prime factors of 13195 are 5, 7, 13 and 29.

// What is the largest prime factor of the number 600851475143 ?


fn divisible_by(n: usize, d:usize) ->bool {
    return n % d == 0;
}

fn main(){
    let v = 600851475143;
    let lim = (600851475143/2)+1;

    let primes = primal::Primes::all().take_while(|p| *p < lim);

     for n in primes {
        
        if divisible_by(v, n){
            println!("CANDIDATE: {}", n);
        } else {
            // println!("{}", n);
        }
    }

}
