// H-Brett
// 12.2.2024
// Advent Calendar of Code Day 2


//part 1 483
//part 2 528

const fs = require("fs")

//fs.readFile('./sampleinput.txt', (err, data) => {
fs.readFile('./input.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const inArr = data.toString().split('\r\n').map((report) => report.split(/\s/).map((val) => parseInt(val)) );
	let unsafeArr = []; 
	let safeArr = []

	const checkIfSafe = (report, layer) => {
		if ( layer == 2 ) { // break recursion
			return false;
		}
		
		if (report[0] < report[1]) { // main entry, increasing
			for (let i = 0; i < report.length; i++) {
				if( (report[i] > report[i + 1]) || ( (Math.abs(report[i] - report[i + 1]) > 3) || (Math.abs(report[i] - report[i+1]) < 1) ) ) { // if not decreasing any longer, or > 3 change, or no change
					if( !(checkIfSafe(report.toSpliced(i, 1), layer + 1) || checkIfSafe(report.toSpliced(i + 1, 1), layer + 1) || checkIfSafe(report.toSpliced(i - 1, 1), layer + 1) ) ) { // recurse with x, x+1, and x-1 removed
							return false
					} else {
						return true;
					}
				} 
			}
		} else if (report[0] > report[1]) { // main entry, decreasing
			for (let i = 0; i < report.length; i++) {
				if( (report[i] < report[i + 1]) || ( (Math.abs(report[i] - report[i + 1]) > 3) || (Math.abs(report[i] - report[i+1]) < 1) ) ) {
					if( !(checkIfSafe(report.toSpliced(i, 1), layer + 1) || checkIfSafe(report.toSpliced(i + 1, 1), layer + 1) || checkIfSafe(report.toSpliced(i - 1, 1), layer + 1) ) ) {
						return false;
					} else {
						return true;
					}
				}
			}
		} else if (report[0] == report[1]) { // main entry equals
			if( !checkIfSafe(report.toSpliced(0, 1), layer + 1) ) {
					if( !checkIfSafe(report.toSpliced(1, 1), layer + 1) ) {
						return false; 
					}
			}
		} else {
			console.log('wait how did we get here'); 
		}

		return true; 
	}

	inArr.forEach((report) => {
		if (checkIfSafe(report,0)) {
			safeArr.push(report)
		} else {
			unsafeArr.push(report)
		}
	})

	console.log(safeArr.length,unsafeArr.length)
})