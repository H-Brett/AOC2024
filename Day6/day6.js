// H-Brett
// 12.12.2024
// Advent Calendar of Code Day 6
// Part 1 4988
// Part 2 1697, 24 min run time oof. 

const fs = require("fs")

fs.readFile('./input.txt', (err, data) => {
//fs.readFile('./sampleInput.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const move = (vector) => {
		let nextX = vector.x;
		let nextY = vector.y;

		if(vector.heading == 'north') {
			nextY--;
		} else if (vector.heading == 'east') {
			nextX++; 
		} else if (vector.heading == 'south') {
			nextY++;
		} else if (vector.heading == 'west') {
			nextX--; 
		}

		return [nextX, nextY];
	}

	const generatePath = (startVec, obst) => {
		let pathComplete = false;
		let path = [];
		let next;

		while (!pathComplete) {
			if (!path[0]) {
				next = move(startVec)
				path.push({
					x: next[0],
					y: next[1],
					heading: 'north',
				})
			} else {
				next = move(path[path.length - 1])
				if ((next[0] == -1 || next[0] == boardW) || (next[1] == -1 || next[1] == boardL)) {
					pathComplete = true; 
				} else {
					if (obst[next[0]] && obst[next[0]].has(next[1])) {
						if (path[path.length - 1].heading == 'north') {
							path[path.length - 1].heading = 'east';
						} else if (path[path.length - 1].heading == 'east') {
							path[path.length - 1].heading = 'south';
						} else if (path[path.length - 1].heading == 'south') {
							path[path.length - 1].heading = 'west';
						} else if (path[path.length - 1].heading == 'west') {
							path[path.length - 1].heading = 'north';
						} 

						next = move(path[path.length - 1])
					}

					path.push({
						x: next[0],
						y: next[1],
						heading: path[path.length - 1].heading,
					})

					if (detectLoop(path)) {
						return false;
					}
				}
				
			}

			
		}

		return path;
	}

	const detectLoop = (path) => {

		return path.length > boardL * boardW * 2 ? true : false;

		/*
		let structured = {
			north: {},
			east: {},
			south: {}, 
			west: {}
		}

		for (let i = 0; i < path.length; i++) {
			if(!structured[path[i].heading][path[i].x]) {
				structured[path[i].heading][path[i].x] = new Set;
			} else if (structured[path[i].heading][path[i].x].has(path[i].y)) {
				return true;
			}

			structured[path[i].heading][path[i].x].add(path[i].y)
		}

		return false;
		*/
	}

	const calcUnique = (path) => {
		let unique = {}; 

		path.forEach((vector) => {
			if (!unique[vector.x]) {
				unique[vector.x] = new Set;
			}

			unique[vector.x].add(vector.y);
		})

		return unique;
	}

	const calcPart1 = (path) => {
		let part1path = [...path]
		part1path.unshift(startVec)
		part1path = calcUnique(part1path)

		let count = 0; 
		for (x in part1path) {
			count += part1path[x].size
		}

		return count;
	}

	const calcPart2 = (path, obst) => {
		let count = 0;
		let part2path = [...path];
		let addedObs = []
		part2path = calcUnique(part2path);

		for ( x in part2path ) {
			part2path[x].forEach((val) => {
				if((parseInt(x) != startVec.x || val != startVec.y)) {
					let workingObst = structuredClone(obst);

					if(!workingObst[parseInt(x)]) {
						workingObst[parseInt(x)] = new Set; 
					}

					workingObst[parseInt(x)].add(val)

					if(!generatePath(startVec, workingObst)) {
						addedObs.push([parseInt(x), val])
						count++;
					}
				}
			})
		}

		addedObs = addedObs.map((coord) => coord.join(','))

/*
		fs.writeFile('wtf.txt', addedObs.join(',\n'), (err) => {
			if (err) console.error(err);
			else {
				console.log('Write Success')
			}
		})
*/
		return count;
	};

console.time('main');
	let obstacles = {};
	let startVec = {
		x: 0,
		y: 0,
		heading: '',
	}
	const input = data.toString().split('\r\n');
	const boardW = input[0].length;
	const boardL = input.length;

	input.forEach((line, y) => {
		for (let x = 0; x < line.length; x++) {
			if (line[x] == '#') {
				if (!obstacles[x]) {
					obstacles[x] = new Set; 
				}

				obstacles[x].add(y); 
			} else if (line[x] == '^') {
				startVec.x = x;
				startVec.y = y; 
				startVec.heading = 'north';
			}
		}
	})

	console.log(startVec)

	let path = generatePath(startVec, obstacles);
	console.time('Part1');
	console.log('Part 1: ', calcPart1(path));
	console.timeEnd('Part1');
	console.time('Part2');
	console.log('Part 2: ', calcPart2(path, obstacles));
	console.timeEnd('Part2');
console.timeEnd('main');
});