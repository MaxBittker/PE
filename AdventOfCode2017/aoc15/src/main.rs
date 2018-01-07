
fn generator_maker(factor: i64, multiple: i64) -> Box<Fn(i64) -> i64> {
    let calc = move |prev: i64| (prev * factor).wrapping_rem(2147483647);

    Box::new(move |prev| {
        let mut canditate = calc(prev);
        loop {
            if canditate % multiple == 0 {
                return canditate;
            } else {
                canditate = calc(canditate)
            }
        }
    })
}


fn main() {
    let a = generator_maker(16807, 4);
    let b = generator_maker(48271, 8);
    let mut a_v = 634;
    let mut b_v = 301;
    let mut c = 0;

    for _ in 0..5_000_000 {
        a_v = a(a_v);
        b_v = b(b_v);
        // println!("{:b} \n{:b}\n", a_v % 65536, b_v % 65536);

        if a_v % 65536 == b_v % 65536 {
            c += 1;
        }
    }

    println!("{}", c);
}
