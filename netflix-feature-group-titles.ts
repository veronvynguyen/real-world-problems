/*
Source**: https://www.educative.io/blog/crack-coding-interview-real-world-problems#netflix
*/
const ALPHABET_INDICES = {
    "a": 0,
    "b": 1,
    "c": 2,
    "d": 3,
    "e": 4,
    "f": 5,
    "g": 6,
    "h": 7,
    "i": 8,
    "j": 9,
    "k": 10,
    "l": 11,
    "m": 12,
    "n": 13,
    "o": 14,
    "p": 15,
    "q": 16,
    "r": 17,
    "s": 18,
    "t": 19,
    "u": 20,
    "v": 21,
    "w": 22,
    "x": 23,
    "y": 24,
    "z": 25
};
let frequenciesVector: number[];
let anagramsMap: {} = {};

function initializeVector() {
    frequenciesVector = Array(26).fill(0);
}

// Non-optimal 
// function groupTitles(titles: string[]) {
// 	initializeVector();
// 	let anagramsMap = {};
// 	let result = [];

// 	for (let i = 0; i < titles.length; i++) {
// 		let title = titles[i];
// 		for (let j = 0; j < title.length; j++) {
// 			const character = title[j];
// 			if (ALPHABET_INDICES[character]) {
// 				frequenciesVector[ALPHABET_INDICES[character]]++;
// 			}
// 		}

// 		let hasCharacters = frequenciesVector.find(v => v > 0);

// 		anagramsMap[frequenciesVector] = hasCharacters && !anagramsMap[frequenciesVector] ? [title] : [...anagramsMap[frequenciesVector], title];

// 		initializeVector();
// 	}

// 	result = Object.values(anagramsMap);

// 	return result as string[];
// }

function mapAnagrams(title) {
    for (let c = 0; c < title.length; c++) {
        let character = title[c];
        if (ALPHABET_INDICES[character]) {
            frequenciesVector[ALPHABET_INDICES[character]]++;
        }
    }
    let hasCharacters = frequenciesVector.find(v => v > 0);
    let isDuplicate = anagramsMap[frequenciesVector] && anagramsMap[frequenciesVector].indexOf(title) > -1;

    if (!isDuplicate) {
        anagramsMap[frequenciesVector] = hasCharacters && !anagramsMap[frequenciesVector] ? [title] : [...anagramsMap[frequenciesVector], title];
    }

    initializeVector();
}

function merge(left, right) {
    let sortedArr = [];

    while (left.length && right.length) {
        mapAnagrams(left.shift());
        mapAnagrams(right.shift());
    }

    return [...sortedArr, ...left, ...right];
}

function mergeGroup(arr) {
    initializeVector();

    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);

    let left = mergeGroup(arr.slice(0, mid));
    let right = mergeGroup(arr.slice(mid));

    return merge(left, right);
}

function groupTitles(arr) {
    mergeGroup(arr);
    return Object.values(anagramsMap);
}

// console.log("groupTitles: ", groupTitles(["duel", "dule", "speed", "spede", "deul", "cars"]))
console.log("groupTitles: ", groupTitles(["duel", "speed", "spede", "deul", "cars", 'cras']));