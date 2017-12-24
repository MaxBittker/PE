isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

let lines = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 680
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`.split("\n");


class Computer {
  constructor(n, friend) {
    this.registers = {};
    this.registers["p"] = n;
    this.queue = [];
    this.friend = friend;
    this.last = null;
    this.PC = 0;
    this.nSent = 0;
  }
  run() {
    if (this.PC > lines.length - 1) {
      console.log("ran off");
      return;
    }
    let toRun = lines[this.PC];
    // console.log("running " + toRun);
    // console.log(this.registers);

    this.call(toRun);
    this.PC++;
  }
  call(str) {
    let [fn, x, y] = str.split(" ");
    this[fn](x, this.resolve(y));
  }
  resolve(v) {
    if (isNumeric(v)) {
      return parseInt(v, 10);
    } else {
      return this.registers[v] || 0;
    }
  }

  // snd X plays a sound with a frequency equal to the value of X.
  snd(x) {
    this.nSent++;
    return this.friend.queue.push(this.resolve(x));
  }
  // set X Y sets register X to the value of Y.
  set(x, y) {
    return (this.registers[x] = y);
  }
  // add X Y increases register X by the value of Y.
  add(x, y) {
    return (this.registers[x] = this.resolve(x) + y);
  }
  // mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
  mul(x, y) {
    return (this.registers[x] = this.resolve(x) * y);
  }
  // mod X Y sets register X to the remainder of dividing the value contained in register X by the value of Y
  mod(x, y) {
    return (this.registers[x] = this.resolve(x) % y);
  }
  // rcv X recovers the frequency of the last sound played, but only when the value of X is not zero.
  rcv(x) {
    let nextValue = this.queue.shift();
    if (nextValue == undefined) {
      this.PC -= 1;
    } else {
      this.registers[x] = nextValue;
    }
  }
  // jgz X Y jumps with an offset of the value of Y, but only if the value of X is greater than zero. (An offset of 2 skips the next instruction, an of
  jgz(x, y) {
    if (this.resolve(x) > 0) {
      this.PC += y - 1;
    }
  }
}


let A = new Computer(0);
let B = new Computer(1, A);
A.friend = B;

while (true) {
  let appc = A.PC;
  let bppc = B.PC;
  A.run();
  B.run();
  console.log(A.queue.length,B.queue.length)
  if (appc == A.PC && bppc == B.PC) {
    console.log("deadlock");
    break;
  }
}
console.log(B.nSent);
