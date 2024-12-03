// H-Brett
// 12.3.2024
// Advent Calendar of Code Day 3
// Part One 173731097
// Part Two 93729253

const fs = require("fs")

fs.readFile('./input.txt', (err, data) => {
//fs.readFile('./sampleInput.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const inArr = data.toString()

	let mulReg = /mul\(\d{1,3}\,\d{1,3}\)/gi // match for mul(###,###)
	let condReg = /do(n't)?/gi // match for do dont instructions
	let mulArr = [...inArr.matchAll(mulReg)]
	let condArr = [...inArr.matchAll(condReg)]
	let resultArr = []

	mulArr = mulArr.map((val) => { // parse out regex junk 
		let numReg = /\d{1,3}/gi
		let numArr = val[0].match(numReg);
		[ x, y ] = numArr

		return [  val.index, parseInt(x), parseInt(y)]
	})

	condArr = condArr.map((val) => { // parse out regex junk
		return [ val.index, val[0] ]
	})

	mulArr.forEach((inst) => { // Part 1, carry out mul instructions
		resultArr.push( inst[1] * inst[2] )
	})

	console.log('Part 1: ', resultArr.reduce((acc,cv) => acc + cv))

	resultArr = []

	let combinedArr = mulArr.concat(condArr).sort((a,b) => a[0] - b[0]); // combine both regex indexed lists, order based on index in position [0]
	let flag = 0; // 0 == 'do', 1 == 'dont' 

	for (let i = 0; i < combinedArr.length; i++) {
		if ( combinedArr[i][1] === "don't") {
			flag = 1
		} else if ( combinedArr[i][1] === 'do' ) {
			flag = 0
		} else {
			if ( flag == 0 ) {
				resultArr.push( combinedArr[i][1] * combinedArr[i][2] );
			}
		}
	}
	
	console.log('Part 2: ', resultArr.reduce((acc,cv) => acc + cv)) // Part 2	
});