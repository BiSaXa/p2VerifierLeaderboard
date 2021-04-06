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
xhr.open("GET", "https://www.speedrun.com/api/v1/games/om1mw4d2", false);
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
console.log(result);
let xhr3 = new XMLHttpRequest();
var output = ""
var place = 0
for (key in result) {
	place++
	xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
	xhr3.send();
	ModName = JSON.parse(xhr3.responseText)
	name2 = ModName["data"]["names"]["international"]
	output += "<tr><td>"+place+"</td><td>" + name2 + "</td><td>" + result[key] + "</td><tr>"
}
document.getElementById("table").innerHTML = output

function downloadCSV(csv, filename){
	var csvFile;
	var downloadLink;
	
	csvFile = new Blob([csv], {type:"text/csv"});
	
	downloadLink = document.createElement("c");
	downloadLink.download = filename;
	downloadLink.href = window.URL.createObjectURL(csvFile);
	downloadLink.style.display = "none";
	
	document.body.appendChild(downloadLink);
	downloadLink.click();
}

function exportTableToCSV(filename){
	var csv = [];
	var rows = document.querySelectorAll("table tr");
	
	for(var i = 0; i < rows.length; i++){
		var row = [], cols = rows[i].querySelectorAll("td, th");
		for(var j = 0; j < cols.length; j++){
			row.push(cols[j].innerText);
		}
		csv.push(row.join(","));
	}
	downloadCSV(csv.join("\n"), filename);
}