extern crate csv;
use std::error::Error;

#[macro_use]
extern crate serde_derive;

// const INPUT: &str = "0:3
//     1: 2
//     4: 4
//     6: 4";

const INPUT: &str = "0: 4
1: 2
2: 3
4: 5
6: 6
8: 4
10: 8
12: 6
14: 6
16: 8
18: 8
20: 6
22: 8
24: 9
26: 8
28: 8
30: 12
32: 12
34: 10
36: 12
38: 12
40: 10
42: 12
44: 12
46: 12
48: 12
50: 12
52: 14
54: 14
56: 12
58: 14
60: 14
62: 14
64: 17
66: 14
70: 14
72: 14
74: 14
76: 14
78: 18
82: 14
88: 18
90: 14";


#[derive(Debug, Deserialize, Copy, Clone)]
struct Scanner {
    depth: i32,
    range: i32,
}


fn parse() -> Result<Vec<Scanner>, Box<Error>> {
    let i = INPUT.replace(" ", "").replace("\t", "");
    let mut rdr = csv::ReaderBuilder::new()
        .has_headers(false)
        .delimiter(b':')
        .from_reader(i.as_bytes());

    return Ok(rdr.deserialize().map(|r| r.unwrap()).collect());
}

// fn severity(scanner: Scanner) -> i32 {
//     return scanner.depth * scanner.range;
// }

fn calc_scanner(scanner: Scanner, delay: i32) -> i32 {
    let loc = (scanner.depth + delay) % (((scanner.range - 2) * 2) + 2);
    // println!("{:?}, {:?}", loc, scanner);
    if loc > 0 {
        return 0;
    } else {
        let sev = 1;
        // println!("HIT: {:?}, {}", scanner, delay);
        return sev;
    }
}


fn main() {
    let scanners = parse().unwrap();
    'outer: for delay in 0..1_000_000_000 {
        'inner: for scanner in scanners.clone() {
            if calc_scanner(scanner, delay) > 0 {
                continue 'outer;
            }
        }
        println!("{}", delay);
        break;
    }
}
