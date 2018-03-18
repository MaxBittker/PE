let input =
`..#
#..
...`;
input =
`.#...#.#.##..##....##.#.#
###.###..##...##.##....##
....#.###..#...#####..#.#
.##.######..###.##..#...#
#..#..#..##..###...#..###
..####...#.##.#.#.##.####
#......#..####..###..###.
#####.##.#.#.##.###.#.#.#
.#.###....###....##....##
.......########.#.#...#..
...###.####.##..###.##..#
#.#.###.####.###.###.###.
.######...###.....#......
....##.###..#.#.###...##.
#.###..###.#.#.##.#.##.##
#.#.#..###...###.###.....
##..##.##...##.##..##.#.#
.....##......##..#.##...#
..##.#.###.#...#####.#.##
....##..#.#.#.#..###.#..#
###..##.##....##.#....##.
#..####...####.#.##..#.##
####.###...####..##.#.#.#
#.#.#.###.....###.##.###.
.#...##.#.##..###.#.###..`

// console.log(input)
let grid = {};
let cI =0 ;
let loc = {x:0,y:0};
let dir = 0;
let directions =
	[
		{x:0, y:1},
		{x:1, y:0},
		{x:0, y:-1},
		{x:-1, y:0},
	]

let locHash = ({x,y})=> {
// console.log(`${x}:${y}`)
return	`${x}:${y}`;

}
let getValue= (l)=>{
	return grid[locHash(l)]
}

let setValue = (l,v)=>{
	grid[locHash(l)] = v

	if(!v){
	delete grid[locHash(l)]
}
}

let burst = ()=>{
	let val = getValue(loc)||0;
	let dD = [-1,0,1,2][val];
	dir = (4 + dir + dD)%4;
	nval = (val+1) %4
	setValue(loc,nval);
	if(nval ==2){
		cI++;
	}
	let rDir = directions[dir];
	loc.x += rDir.x;
	loc.y += rDir.y;
	// console.log(loc, dir)
}


let loadGrid = (input)=>{
	let iGrid = input.split("\n").map(l=>l.split(""));
	let s = iGrid.length
	let r = (s-1)/2;
	console.log(s,r)
	// console.log(iGrid);
	iGrid.forEach((line,y)=>{
		line.forEach((v,x)=>{
			setValue({x:x-r,y:r-y}, v=="#"?2:0)
		})
	})
}

loadGrid(input)

// console.log(grid)
let bursts = n=>{
	for(let b=0;b<n;b++){
		burst()
		// console.log(loc)
	}
	// console.log(grid)
}
let printGrid =n=>{
	let row = ""
		for(let y = n;y>=-n;y--){
			for(let x = -n;x<=n;x++){
			row+=getValue({x,y})|| "."
		}
		row+="\n"
}
console.log(row)
}
printGrid(12)
bursts(10000000);
printGrid(50)
// 2512272 too high
console.log(cI)
