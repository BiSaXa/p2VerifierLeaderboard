if (navigator.serviceWorker) {
		navigator.serviceWorker.register('/p2VerifierLeaderboard/sw.js', {scope: '/p2VerifierLeaderboard/'})
	}
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
        newObject[keys[i]]= value;
    }
    return newObject;
}
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.speedrun.com/api/v1/games/om1mw4d2", true);
xhr.send();
moderators = []
runsVerified = []
database = JSON.parse(xhr.responseText);
for (key in database["data"]["moderators"]) {
	moderators.push(key)
}
let xhr2 = new XMLHttpRequest();
for (var i = moderators.length - 1; i >= 0; i--) {
	xhr2.open("GET", "https://www.speedrun.com/api/v1/runs?game=om1mw4d2&max=200&examiner=" + moderators[i], false);
	xhr2.send();
	runs = JSON.parse(xhr2.responseText)
	runsVerifiedNumberP2 = runs.pagination.size
	do {
		if (runs.pagination.size == 200) {
			xhr2.open("GET", "https://www.speedrun.com/api/v1/runs?game=om1mw4d2&max=200&examiner=" + moderators[i] + "&offset=" + runsVerifiedNumberP2, false);
			xhr2.send();
			runs = JSON.parse(xhr2.responseText)
			runsVerifiedNumberP2 += runs.pagination.size
		}

	} while (runs.pagination.size == 200)

	runsVerified.push(runsVerifiedNumberP2)

}

runsVerified = runsVerified.reverse()
var result = {};
moderators.forEach((key, i) => result[key] = runsVerified[i]);

result = swap(result)
result = sortObject(result)
result = swap(result)
result = reverseObject(result)

//	_Smiley king
//console.log(result);
let xhr3 = new XMLHttpRequest();
var output = ""
var txtout = ""
var place = 0
for (key in result) {
	place++
	xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
	xhr3.send();
	ModName = JSON.parse(xhr3.responseText)
	name2 = ModName["data"]["names"]["international"]
	output += "<tr><td>"+place+"</td><td>" + name2 + "</td><td>" + result[key] + "</td><tr>"
	txtout += place+","+"\""+name2+"\""+","+result[key]+"\n"
}
var txtInput = fetch('output.txt')
  .then(response => response.text())
  .then(text => console.log(text))
console.log(txtInput);
document.getElementById("table").innerHTML = text

function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' +

encodeURIComponent(text));
  pom.setAttribute('download', filename);

  pom.style.display = 'none';
  document.body.appendChild(pom);

  pom.click();

  document.body.removeChild(pom);
}

window.onload = function() {

  var finalOutput = output
	let btnExportCSV = document.querySelector('#exportCSVBtn');
	btnExportCSV.onclick = () => {
		console.log("Export in CSV");
		download("output.csv", output) // this system took me fucking 2 days for fucks sake
	};
}
