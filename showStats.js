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

var txtInput = fetch('P2output.txt')
  .then(response => response.text())
  .then(text => document.getElementById("table").innerHTML = text)
//document.getElementById("table").innerHTML = output;

/*var txtInput = fetch('output.txt')
	.then(response => response.text())
	.then(text => download("output.txt", text))*/
//download("output.csv", stripped) // this system took me fucking 2 days for fucks sake

window.onload = function() {


	let p2Board = document.querySelector('#P2Table');
	p2Board.onclick = () => {
		console.log("Changing table to P2.");
		//ADD TABLE CHANGE HERE
		var txtInput = fetch('P2output.txt')
		  .then(response => response.text())
		  .then(text => document.getElementById("table").innerHTML = text)

	};

	let p2CEBoard = document.querySelector('#P2CETable');
	p2CEBoard.onclick = () => {
		console.log("Changing table to P2CE.");
		//ADD TABLE CHANGE HERE
		var txtInput = fetch('P2CEoutput.txt')
		  .then(response => response.text())
		  .then(text => document.getElementById("table").innerHTML = text)

	};

	let pRBoard = document.querySelector('#PRTable');
	pRBoard.onclick = () => {
		console.log("Changing table to PR.");
		//ADD TABLE CHANGE HERE
		var txtInput = fetch('PRoutput.txt')
		  .then(response => response.text())
		  .then(text => document.getElementById("table").innerHTML = text)

	};
}
