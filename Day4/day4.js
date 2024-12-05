// H-Brett
// 12.4.2024
// Advent of Code 2024 Day 4

// Part 1 2414
// Part 2

const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
//fs.readFile('./sampleInput.txt', (err, data) => {
	if(err) {
		return console.error(err);
	};

	const inArr = data.toString().split('\r\n');
	
	const rot45 = (matrix) => {
		const x = matrix.length
		const y = matrix[0].length
		let rotArr = []

		for(let h = 0; h < x * 2 - 1; h++) {
			for(let i = 0; i < x; i++) {
				for(let j = 0; j < y; j++) {
					
					if (i + j == h) {
						rotArr.push(matrix[j][i])
					}
				}
			}
			rotArr.push('\n')
		}

		return rotArr.join('').split('\n'); 
	}

	const rot90 = (matrix) => {
		const x = matrix.length
		const y = matrix[0].length
		let rotArr = []

		for(let i = 0; i < y; i++) {
			for(let j = x - 1; j >= 0; j--) {
				rotArr.push(matrix[j][i])
			}
			i != y - 1 ? rotArr.push('\n') : null
		}

		return rotArr.join('').split('\n');
	}

	const part1 = (input) => {
		let xmasReg = /XMAS/gi
		let count = 0;

		let fortyFive = rot45(input)
		let ninety = rot90(input)
		let oneThirtyFive = rot45(ninety)
		let oneEighty = rot90(ninety)
		let twoTwentyFive = rot45(oneEighty)
		let twoSeventy = rot90(oneEighty)
		let threeFifteen = rot45(twoSeventy)
		
		let combined = input.concat(fortyFive).concat(ninety).concat(oneThirtyFive).concat(oneEighty).concat(twoTwentyFive).concat(twoSeventy).concat(threeFifteen)
		//console.log(combined.join('\n'))

		combined.forEach((line) => {
			count += [...line.matchAll(xmasReg)].length
		})

		return count; 
	}


	console.log(part1(inArr))
});