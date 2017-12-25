let input = ``;

let min = 0;
let max = 0;

let tape = [];
let cursor = 0;
let state = "A";
let step = 0;
function get() {
  return tape[cursor] || 0;
}
function set(v) {
  return (tape[cursor] = v);
}


function run() {
  let v = get();

  if (state == "A"){
    if( v ==0){
         set(1)
        cursor++
        state = "B"
        return
    }else{
         set(0)
        cursor++
        state = "F"
        return
    }
}
if (state == "B"){
    if( v ==0){
         set(0)
        cursor--
        state = "B"
        return
    }else{
         set(1)
        cursor--
        state = "C"
        return
    }
}
  if (state == "C") {
    if (v == 0) {
      set(1);
      cursor--;
      state = "D";
      return;
    } else {
      set(0);
      cursor++;
      state = "C";
      return;
    }
  }
  if (state == "D") {
    if (v == 0) {
      set(1);
      cursor--;
      state = "E";
      return;
    } else {
      set(1);
      cursor++;
      state = "A";
      return;
    }
  }
  if (state == "E") {
    if (v == 0) {
      set(1);
      cursor--;
      state = "F";
      return;
    } else {
      set(0);
      cursor--;
      state = "D";
      return;
    }
  }
  if (state == "F") {
    if (v == 0) {
      set(1);
      cursor++;
      state = "A";
      return;
    } else {
      set(0);
      cursor--;
      state = "E";
      return;
    }
  }
}

function checksum() {
  let c = 0;
  for (var i = min; i <= max; i++) {
    if (tape[i] == 1) {
      c++;
    }
  }
  return c;
  //   return tape.filter(n => n == 1).length;
}
while (step < 12964419) {

  run();
  step++;
  max = Math.max(max, cursor);
  min = Math.min(min, cursor);
  if (step % 100000 == 0 || step > 12964419 - 20) {
    console.log(min, max);
    console.log(step, cursor, state);
    console.log(checksum());
  }
}
console.log(checksum());
