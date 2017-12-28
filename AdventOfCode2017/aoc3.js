// 147  142  133  122   59
// 304    5    4    2   57
// 330   10    1    1   54
// 351   11   23   25   26
// 362  747  806--->   ...
let directions = [
  [1, 0], //right
  [0, 1], //up
  [-1, 0], //left
  [0, -1] //down
];
let directionsWithDiagonals = [...directions, [-1, -1], [-1, 1], [1, -1], [1, 1]]

let grid = {};
let hash = c => c.join("|");
let get = c => grid[hash(c)] || 0;
let set = (c, v) => grid[hash(c)] = v;
let add = ([ax, ay], [bx, by]) => [ax + bx, ay + by];

let neighbors = c =>
  directionsWithDiagonals.map(d => add(c, d));
let sumNeighbors = c => neighbors(c).map(get).reduce((a, b) => a + b);

let spiral = lim => {
  let loc = [0, 0];
  set(loc, 1);
  
  let di = 0;
  while (true) {
    let direction = directions[di];
    let nextDirection = directions[(di + 1) % 4];

    loc = add(loc, direction);
    let newv = sumNeighbors(loc);
    set(loc, newv);

    
    if (!get(add(loc, nextDirection))) {
      di = (di + 1) % 4;
    }
    
    if (newv > lim) {
        return newv;
    }
  }
};

console.log(spiral(289326));
