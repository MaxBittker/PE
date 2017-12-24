isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

registers = {};
last = null;
PC = 0;
exited = false;

resolve = v => {
  if (isNumeric(v)) {
    return parseInt(v, 10);
  } else {
    return registers[v] || 0;
  }
};

// snd X plays a sound with a frequency equal to the value of X.
snd = x => last = resolve(x);
// set X Y sets register X to the value of Y.
set = (x, y) => registers[x] = y;
// add X Y increases register X by the value of Y.
add = (x, y) => registers[x] = resolve(x) + y;
// mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
mul = (x, y) => registers[x] = resolve(x) * y;
// mod X Y sets register X to the remainder of dividing the value contained in register X by the value of Y (that is, it sets X to the result of X modulo Y)
mod = (x, y) => registers[x] = resolve(x) % y;
// rcv X recovers the frequency of the last sound played, but only when the value of X is not zero. (If it is zero, the command does nothing.)
rcv = x => {
  if (resolve(x) !== 0) {
    console.log("recovered" + last);
    exited = true;
  }
};
// jgz X Y jumps with an offset of the value of Y, but only if the value of X is greater than zero. (An offset of 2 skips the next instruction, an of
jgz = (x, y) => {
  if (resolve(x) > 0) {
    PC += y - 1;
  }
};

call = str => {
  [fn, x, y] = str.split(" ");
  operations[fn](x, resolve(y));
};

let operations = { snd, set, add, mul, mod, rcv, jgz };

let input = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;

input = `set i 31
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
jgz a -19`
lines = input.split("\n");

while (!exited) {
    toRun = lines[PC]
    console.log("running " + toRun)
    call(toRun)
    console.log(registers)
    
    if(exited){
        console.log(last)
       break; 
    }
    PC++;
}
