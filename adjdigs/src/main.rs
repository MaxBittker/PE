extern crate num;
extern crate primal;
// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

// a^2 + b^2 = c^2
// For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product abc.


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
