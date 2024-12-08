// H-Brett
// 12.7.2024
// Advent Calendar of Code Day 6
// Part 1 4988

const fs = require("fs")

fs.readFile('./input.txt', (err, data) => {
//fs.readFile('./sampleInput.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	let inArr = data.toString()
	let line = Math.floor(inArr.indexOf('^') / inArr.length * inArr.split('\r\n').length)
	inArr = inArr.split('\r\n');
	inArr = inArr.map((line) => line.split(''))
	let lineIndex = inArr[line].indexOf('^')
	let heading = 0
	let uniqueCount = 0;


	let flag = true;
	while ( flag == true ) {
		if (inArr[line][lineIndex] == '#') {
			switch(heading) {
			case 0:
				line++;
				break;
			case 90:
				lineIndex--;
				break;
			case 180:
				line--;
				break;
			case 270:
				lineIndex++;
				break;
			}

			heading += 90;
			heading == 360 ? heading = 0 : null; 
		} else if ( (inArr[line][lineIndex] != 'X')) {
			inArr[line][lineIndex] = 'X'
			uniqueCount++;
		}

		switch(heading) {
		case 0:
			line--;
			break;
		case 90:
			lineIndex++;
			break;
		case 180:
			line++;
			break;
		case 270:
			lineIndex--;
			break;
		}

		if ( (line == -1 || line == inArr.length) || (lineIndex == -1 || lineIndex == inArr[line].length) ) {
			flag = false
		}
	}

	console.log(uniqueCount)

	inArr = inArr.map((line) => line.join(''))
	console.log(inArr.join('\n'))
});