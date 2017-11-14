
// extern crate primal;
extern crate num;
use std::cmp;
// use num::FromPrimitive;
// use num::bigint::BigInt;
// // use num::ToPrimitive;
// If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.

// {20,48,52}, {24,45,51}, {30,40,50}

// For which value of p ≤ 1000, is the number of solutions maximised?


fn is_triange(x:i64,y:i64,z:i64) -> bool{

    if y < x {
        return is_triange(y,x,z);
    }
    if z < y {
        return is_triange(x,z,y);
    }

    return z*z == x*x + y*y;
}

fn triange_count(p: i64) -> i64 {
    let mut c = 0;
    for x in 1..p-1{
        let yz = p - x;
        for y in 1..yz{
            let z = yz - y;
            if is_triange(x,y,z){
                c+=1;
            }
        }
    }
    return c/6;
}
fn main() {
    
    let mut max = 0;
    for p in 0..1000 {
        let c = triange_count(p);
        max = cmp::max(c,max);
        if max == c{
            println!("{}:\t{}", p,c);
        }
    }

}
