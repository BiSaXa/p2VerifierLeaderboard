if (navigator.serviceWorker) {
		navigator.serviceWorker.register('/p2VerifierLeaderboard/sw.js', {scope: '/p2VerifierLeaderboard/'})
}
/*var mainText = ""
function setText(url) {
        var doc = new XMLHttpRequest();
        doc.onreadystatechange = function() {
            if (doc.readyState == XMLHttpRequest.DONE) {
                mainText.text = doc.responseText;
            }
        }
        doc.open("GET", url);
        doc.setRequestHeader("Content-Encoding", "UTF-8");
        doc.send();
    }
setText("https://bisaxa.github.io/p2VerifierLeaderboardBackend/")*/
/*var output = ""

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE) {
				output.text = xhr.responseText;
		}
		output = xhr.responseText;
}
xhr.open("GET", "https://bisaxa.github.io/p2VerifierLeaderboardBackend/" + ((/\?/).test("https://bisaxa.github.io/p2VerifierLeaderboardBackend/") ? "&" : "?") + (new Date()).getTime(), false);
xhr.send();*/

var txtInput = fetch('output.txt')
  .then(response => response.text())
  .then(text => document.getElementById("table").innerHTML = text)
//document.getElementById("table").innerHTML = output;

/*function download(filename, text) {
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

	let btnExportCSV = document.querySelector('#exportCSVBtn');
	btnExportCSV.onclick = () => {
		console.log("Export in CSV");
		var txtInput = fetch('output.csv')
		  .then(response => response.text())
		  .then(text => download("output.csv", text))
		//download("output.csv", stripped) // this system took me fucking 2 days for fucks sake
	};

	let btnExportTXT = document.querySelector('#exportTXTBtn');
	btnExportTXT.onclick = () => {
		console.log("Export in TXT");
		var txtInput = fetch('output.txt')
		  .then(response => response.text())
		  .then(text => download("output.txt", text))
		//download("output.csv", stripped) // this system took me fucking 2 days for fucks sake
	};
}*/
