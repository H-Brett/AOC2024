// H-Brett
// 12.8.2024
// Advent Calendar of Code Day 7
// Part 1 663613490587


const fs = require("fs")

fs.readFile('./input.txt', (err, data) => {
//fs.readFile('./sampleInput.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const input = data
		.toString()
		.split('\r\n')
		.map((line) => line.split(': '))
			.map((line) => { 
				return {
					result: parseInt(line[0]),
					operands: line[1].split(' ')
						.map((val) => parseInt(val)).reverse(),
				}
			})

	const recurse = (operands, operations) => {
		//console.log('start ', operands)

		let results = []
		if (operands.length == 2) {
			results = [
				(operands[0] + operands[1]), 
				(operands[0] * operands[1])
			]

			return results
		} else {
			let left = operands[0]
			let rights = recurse(operands.slice(1), operations)

			for (right of rights) {

				for (n of recurse([left, right], operations)) {
					results.push(n)
				}
			}

			return results
		}	
	}
	
	const part1 = (input) => {
		const operations = ['add', 'mul']
		let count = 0

		//console.log(recurse(input[8].operands, operations))

		input.forEach((calibration) => {
			

			if ( recurse(calibration.operands, operations).includes(calibration.result) ) {
				count += calibration.result
			}

		})
		console.log(count)
	}

	part1(input)
	
});