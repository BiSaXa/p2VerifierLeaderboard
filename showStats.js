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
  
var lastUpdate = fetch("https://api.github.com/repos/bisaxa/p2VerifierLeaderboard/branches/gh-pages")
      .then(response => {
        response.json().then(json => {
		  let lastDate = json.commit.commit.author.date.slice(0,10); // + " " + json.commit.commit.author.date.slice(11,19);
          console.log("Last Update: " + lastDate);
		  document.getElementById("last-build").innerHTML = "Last Updated: " + lastDate; // + " UTC";
        });
      })
      .catch(error => {
        console.log(error);
});

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

	let p2SMBoard = document.querySelector('#P2SMTable');
	p2SMBoard.onclick = () => {
		console.log("Changing table to P2SM.");
		//ADD TABLE CHANGE HERE
		var txtInput = fetch('P2SMoutput.txt')
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
