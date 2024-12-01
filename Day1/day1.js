// H-Brett
// 12.1.2024
// Advent Calendar of Code Day 1

const fs = require("fs")

//fs.readFile('./sampleinput.txt', (err, data) => {
fs.readFile('./input.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const inArr = data.toString().split('\r\n')

	const groupData = (inputData) => {
		let groupOne = []
		let groupTwo = []

		inputData.forEach((line) => {
			[one, two] = line.split(/\s{1,}/)
			groupOne.push(one);
			groupTwo.push(two);
		})

		groupOne.sort((a,b) => a - b)
		groupTwo.sort((a,b) => a - b)

		return [groupOne,groupTwo]
	}


	const partOne = (inputData) => {	
		let between = []
		let [groupOne, groupTwo] = groupData(inputData)

		for (let i = 0; i < inArr.length; i++) {
			if(groupOne[i] < groupTwo[i]) {
				between.push(groupTwo[i] - groupOne[i]);
			} else if (groupOne[i] > groupTwo[i]) {
				between.push(groupOne[i] - groupTwo[i]);
			} else if (groupOne[i] == groupTwo[i]) {
				between.push(0);
			} else {
				console.log('How did we get here?');
			}
		}

		return between; 
	}

	const partTwo = (inputData) => {
		let similar = []
		let [groupOne, groupTwo] = groupData(inputData);

		groupOne.forEach((val) => {
			if (groupTwo.includes(val)) {
				let first = groupTwo.indexOf(val);
				let last = groupTwo.lastIndexOf(val);
				let occur = 1; 

				if(first !== last) {
					occur = occur + last - first;
				} 

				similar.push(val * occur);
			} else {
				similar.push(0)
			}
		})

		return similar;
	}

	console.log(partOne(inArr).reduce((acc, cV) => acc + cV));
	console.log(partTwo(inArr).reduce((acc, cV) => acc + cV));
});