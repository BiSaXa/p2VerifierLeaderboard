if (navigator.serviceWorker) {
		navigator.serviceWorker.register('/p2VerifierLeaderboard/sw.js', {scope: '/p2VerifierLeaderboard/'})
	}
var txtInput = fetch('output.txt')
  .then(response => response.text())
  .then(text => document.getElementById("table").innerHTML = text)
