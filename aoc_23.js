isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);
let cycle = 0;
let lines = `set b 93
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz 0 -8 MOD g 0
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`.split("\n");
function printRegisters({a,b,c,d,e,f,g,h}){
  console.log({b,c,d,e,f,g,h})
}
class Computer {
  constructor() {
    this.registers = {};
    this.registers["a"] = 1;

    this.PC = 0;
    this.nSent = 0;
    this.lineCounts = new Array(lines.length).fill(0);

    this.halt = false;
  }
  run() {
    cycle++;
    if (this.PC > lines.length - 1) {
      console.log("ran off");
      return;
    }
    let toRun = lines[this.PC];
    this.lineCounts[this.PC]++;
    // if(this.PC ==20){      // this.halt=true;
    // }
    this.call(toRun);
    if (this.PC == 29) {
      console.log("running " + (this.PC+1) + "\t" +toRun);
      console.log(this.PC);
      console.log(this.lineCounts.join(", "));
      printRegisters(this.registers);
    }

    this.PC++;
  }
  call(str) {
    let [fn, x, y, ...c] = str.split(" ");
    this[fn](x, this.resolve(y));
  }
  resolve(v) {
    if (isNumeric(v)) {
      return parseInt(v, 10);
    } else {
      return this.registers[v] || 0;
    }
  }
  set(x, y) {
    // set X Y sets register X to the value of Y.
    return (this.registers[x] = y);
  }
  sub(x, y) {
    // sub X Y decreases register X by the value of Y.
    return (this.registers[x] = this.resolve(x) - y);
  }
  mul(x, y) {
    // mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
    this.nSent++;
    return (this.registers[x] = this.resolve(x) * y);
  }
  jnz(x, y) {
    // jnz X Y jumps with an offset of the value of Y, but only if the value of X is not zero. (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
    if (this.resolve(x) != 0) {
      this.PC += y - 1;
    }
  }
}

let C = new Computer();
let n = Infinity;
while (n-- > 0) {
  let ppc = C.PC;
  C.run();
  if (ppc == C.PC) {
    console.log("deadlock");
    break;
  }
  if (C.halt) break;
}
console.log(C.registers["h"]||0);
console.log(cycle)