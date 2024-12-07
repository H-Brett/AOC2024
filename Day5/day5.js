// H-Brett
// 12.5.2024
// Advent Calendar of Code Day 5
// Part 1: 4569
// Part 2: 6456

const fs = require("fs")

fs.readFile('./input.txt', (err, data) => {
//fs.readFile('./sampleInput.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const inArr = data.toString().split('\r\n\r\n');
	const instructions = inArr[0].split('\r\n').map((pair) => pair.split('|').map((val) => parseInt(val)));
	const updates = inArr[1].split('\r\n').map((update) => update.split(',').map((val) => parseInt(val)) );

	let instMap = {}
	instructions.forEach((inst) => {
		if ( !instMap[inst[0]] ) {
			instMap[inst[0]] = new Set;
		} else if ( !instMap[inst[1]] ) {
			instMap[inst[1]] = new Set; 
		}

		instMap[inst[0]].add(inst[1]);
	})

	const checkValid = (update) => {
		flag = true; 
		for ( let i = 0; i < update.length - 1; i++ ) {
			if (!instMap[update[i]].has(update[i + 1])) {
				//console.log('flagging false')
				flag = false; 
			}
		}

		if (flag) {
			return true;
		} else {
			return false;
		}
	}

	const fixUpdate = (update) => {
		let working = [...update]

		for (let i = working.length - 1; i > 0; i--) {
			if(instMap[working[i]].has(working[i - 1])) {
				working[i] = working[i] + working[i - 1]
				working[i - 1] = working[i] - working[i - 1]
				working[i] = working[i] - working[i - 1]

				if(checkValid(working)) {
					return working;
				} else {
					return fixUpdate(working);
				}
			}
		}
	}

	const part1 = (updates) => {
		let count = 0; 

		updates.forEach((update) => {
			if(checkValid(update)) {
				count += update[(update.length - 1) / 2]
			}
		})

		return count;
	}

	const part2 = (updates) => {
		let count = 0;

		updates.forEach((update) => {
			if(!checkValid(update)) {
				count += fixUpdate(update)[(update.length - 1) / 2]
			}
		})

		return count; 
	}

	console.log('Part 1: ', part1(updates))
	console.log('Part 2: ', part2(updates))
});
