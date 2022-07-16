// define functions
function swap(json) {
	var ret = {};
	for (var key in json) {
		ret[json[key]] = key;
	}
	return ret;
}
function sortObject(obj) {
	return Object.keys(obj)
		.sort().reduce((a, v) => {
			a[v] = obj[v];
			return a;
		}, {});
}
function reverseObject(object) {
	var newObject = {};
	var keys = [];
	for (var key in object) {
		keys.push(key);
	}
	for (var i = keys.length - 1; i >= 0; i--) {
		var value = object[keys[i]];
		newObject[keys[i]] = value;
	}
	return newObject;
}
let apicount = 0;
const ids = [
	"4pd0n31e", //P1
	"v1p4rp18", //P1CE
	"369p5q81", //P1F
	"3693226l", //P1FMP
	"y655836e", //P1PR
	"4d7999r1", //P1SA
	"4d793gz1", //P1UN
	"om1mw4d2", //P2
	"m1mx7nx6", //P2CE
	"4d79y4n1", //DFD
	"3dxk0jy1", //WB
	"9d3loedl", //MM
	"o1y908r6", //DPDN
	"4d7o0317", //HL2DP
	"kyd45w6e", //APT
	"j1l7g7dg", //TWTM
	"9do3z7dp", //P1DP2
	"j1nz9l1p", //MEL
	"k6q45z0d", //VR
	"kdkg4x1m", //ELE
	"y65p97de", //RRR
	"k6q4e80d", //PRV
	"o1y99nr6", //BCP
	"lde3eme6", //P2SM
	"46w3km91", //ME
	"w6j7one6", //PEE
	"v1po9o76", //PBM
	"268w3ko6", //PUR
	"yd4km2k6"	//PR
];
document.getElementById("warning").innerHTML = "Select a game to view its leaderboards. Loading might take a couple of seconds..";
window.onload = function() {
	let P1Board = document.querySelector("#P1Table");
	P1Board.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[0]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[0]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[0]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let P1CEBoard = document.querySelector("#P1CETable");
	P1CEBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[1]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[1]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[1]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let P1FBoard = document.querySelector("#P1FTable");
	P1FBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[2]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[2]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[2]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let P1FMPBoard = document.querySelector("#P1FMPTable");
	P1FMPBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[3]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[3]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[3]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let P1PRBoard = document.querySelector("#P1PRTable");
	P1PRBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[4]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[4]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[4]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let P1SABoard = document.querySelector("#P1SATable");
	P1SABoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[5]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[5]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[5]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let P1UNBoard = document.querySelector("#P1UNTable");
	P1UNBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[6]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[6]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[6]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let P2Board = document.querySelector("#P2Table");
	P2Board.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[7]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		// ADDING EX-MODS/VERIFIERS MANUALLY
		moderators.push("zxz759jq"); // Portal_Rex
    		moderators.push("68wl4ovj"); // Msushi
    		moderators.push("qxkovr28"); // zach
    		moderators.push("8e9157dj"); // ales
    		moderators.push("7j4v5lj1"); // AJ
    		moderators.push("18qr5wjn"); // Klooger
    		moderators.push("dx33kdex"); // spidda
   		moderators.push("pj0n1q38"); // Fatman992
    		moderators.push("18v52vjl"); // Znernicus
    		moderators.push("1xyv32mx"); // lucas
    		moderators.push("jmoolve8"); // RealCreative
    		moderators.push("e8eky1o8"); // BSSDRVN
    		moderators.push("jmoqqre8"); // AirHead
    		moderators.push("pj03qwjw"); // Hyper
    		moderators.push("qjng618m"); // Zypeh
    		moderators.push("68wkq38g"); // PerOculos
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[7]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[7]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		//result = swap(result);
		result = sortObject(result);
		//result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let P2CEBoard = document.querySelector("#P2CETable");
	P2CEBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[8]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[8]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[8]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let DFDBoard = document.querySelector("#DFDTable");
	DFDBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[9]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[9]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[9]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let WBBoard = document.querySelector("#WBTable");
	WBBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[10]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[10]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[10]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let MMBoard = document.querySelector("#MMTable");
	MMBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[11]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[11]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[11]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let DPDNBoard = document.querySelector("#DPDNTable");
	DPDNBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[12]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[12]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[12]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let HL2DPBoard = document.querySelector("#HL2DPTable");
	HL2DPBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[13]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[13]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[13]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let APTBoard = document.querySelector("#APTTable");
	APTBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[14]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[14]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[14]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let TWTMBoard = document.querySelector("#TWTMTable");
	TWTMBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[15]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[15]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[15]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let P1DP2Board = document.querySelector("#P1DP2Table");
	P1DP2Board.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[16]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[16]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[16]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let MELBoard = document.querySelector("#MELTable");
	MELBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[17]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[17]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[17]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let VRBoard = document.querySelector("#VRTable");
	VRBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[18]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[18]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[18]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let ELEBoard = document.querySelector("#ELETable");
	ELEBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[19]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[19]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[19]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let RRRBoard = document.querySelector("#RRRTable");
	RRRBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[20]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[20]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[20]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let PRVBoard = document.querySelector("#PRVTable");
	PRVBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[21]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[21]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[21]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let BCPBoard = document.querySelector("#BCPTable");
	BCPBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[22]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[22]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[22]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let P2SMBoard = document.querySelector("#P2SMTable");
	P2SMBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[23]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[23]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[23]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let MEBoard = document.querySelector("#METable");
	MEBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[24]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[24]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[24]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let PEEBoard = document.querySelector("#PEETable");
	PEEBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[25]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[25]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[25]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let PBMBoard = document.querySelector("#PBMTable");
	PBMBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[26]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[26]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[26]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let PURBoard = document.querySelector("#PURTable");
	PURBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[27]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[27]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[27]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
	let PRBoard = document.querySelector("#PRTable");
	PRBoard.onclick = () => {
		apicount = 0;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://www.speedrun.com/api/v1/games/${ids[28]}`, false);
		xhr.send();
		apicount++;
		moderators = [];
		runsVerified = [];
		database = JSON.parse(xhr.responseText);
		for (key in database["data"]["moderators"]) {
			moderators.push(key);
		}
		let xhr2 = new XMLHttpRequest();
		for (var i = moderators.length - 1; i >= 0; i--) {
			xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[28]}&max=200&examiner=${moderators[i]}`, false);
			xhr2.send();
			apicount++;
			runs = JSON.parse(xhr2.responseText);
			runsVerifiedNumber = runs.pagination.size;
			do {
				if (runs.pagination.size == 200) {
					xhr2.open("GET", `https://www.speedrun.com/api/v1/runs?game=${ids[28]}&max=200&examiner=${moderators[i]}&offset=${runsVerifiedNumber}`, false);
					xhr2.send();
					apicount++;
					runs = JSON.parse(xhr2.responseText);
					runsVerifiedNumber += runs.pagination.size;
				}
			} while (runs.pagination.size == 200);
			runsVerified.push(runsVerifiedNumber);
		}
		runsVerified = runsVerified.reverse();
		var result = {};
		moderators.forEach((key, i) => result[key] = runsVerified[i]);
		result = swap(result);
		result = sortObject(result);
		result = swap(result);
		result = reverseObject(result);
		let xhr3 = new XMLHttpRequest();
		var output = "";
		var place = 0;
		for (key in result) {
			place++
			xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
			xhr3.send();
			apicount++;
			modNameRaw = JSON.parse(xhr3.responseText)
			modName = modNameRaw["data"]["names"]["international"]
			output += "<tr><td>" + place + "</td><td>" + modName + "</td><td>" + result[key] + "</td><tr>"
		}
		document.getElementById("warning").innerHTML = "";
		document.getElementById("table").innerHTML = output;
		console.log(apicount);
	};
};
