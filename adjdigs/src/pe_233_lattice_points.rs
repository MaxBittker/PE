
// extern crate primal;
extern crate num;
// use std::cmp;

// use num::FromPrimitive;
// use num::bigint::BigInt;
// use num::ToPrimitive;

// use num::rational::{Ratio, BigRational};
// Let f(N) be the number of points with integer coordinates that are
//  on a circle passing through (0,0), (N,0),(0,N), and (N,N).
// It can be shown that f(10000) = 36.
// What is the sum of all positive integers N ≤ 10^11 such that f(N) = 420 ?
fn is_square(n: i64) -> bool {
    let mut guess = n / 4;
    let mut last_guess = 0;
    for _i in 1..150 {
        let difference = (guess * guess) - n;
        if difference == 0 {
            return true;
        }
        if guess == 0 {
            return false;
        }
        let new_guess = (guess + n / guess) / 2;
        if new_guess == guess || new_guess == last_guess {
            return false;
        }
        // println!("{},{},{}",new_guess,guess, last_guess);
        last_guess = guess;
        guess = new_guess;
    }
    println!("is_square failed on {}", n);
    return false;
}


fn divisible_by(n: i64, d: i64) -> bool {
    return n % d == 0;
}


fn count_lattice_points(r: i64) -> i64 {
    let rr = r * r;
    let mut count = 0;
    for x in 1..r {
        let xx = x * x;
        let yy = rr - xx;

        if is_square(yy) {
            count += 1;
        }
    }
    return (count * 4) + 4;
}
fn sum_of_squares(n: i64) -> i64 {
    let mut d1 = 0;
    let mut d3 = 0;

    for d in 1..n {
        if divisible_by(n, d) {
            let q = (n / d) % 4;
            if q == 1 {
                d1 += 1;
            }
            if q == 3 {
                d3 += 1;
            }
        }
    }

    return 4 * (d1 - d3);
}

fn math_count_lattice_points(r: i64) -> i64 {
    let rr = r * r;
    return sum_of_squares(rr) + 4;
}
fn main() {
    // What is the sum of all positive integers N ≤ 10^11 such that f(N) = 420 ?
    let mut sum = 0;
    for n in 0..10001 {
        let c = count_lattice_points(n);
        let c = math_count_lattice_points(n);
        // if c!=nc{
        // println!("{}: {}-{}", n,c,nc);
        // }
        if n % 1000 == 0 {
            println!("{}:{}", n, c);
        }
        if c == 420 {
            sum += n;
            println!("{}:{}", n, c);
        }
    }
    println!("SUM:{}", sum);
}
