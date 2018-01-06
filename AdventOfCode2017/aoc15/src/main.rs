//lowest 16 bits of both values, and keeps track of the number of times those parts of the values
//match.

//take the previous value it produced, multiply it by a factor (generator A uses 16807; generator
//B uses 48271), and then keep the remainder of dividing that resulting product by 2147483647. That

// fn generator_maker(factor: i64) -> (fn(i64) -> i64) {
//     |prev| (prev * factor).wrapping_rem(2147483647);
// }

fn generator_maker(factor: i64) -> Box<Fn(i64) -> i64> {
    Box::new(move |prev| (prev * factor).wrapping_rem(2147483647))
}


fn main() {
    let a = generator_maker(16807);
    let b = generator_maker(48271);

    println!("{:?} : {:?}", a(65), b(65));
}
