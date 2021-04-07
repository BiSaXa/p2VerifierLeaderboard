if (navigator.serviceWorker) {
		navigator.serviceWorker.register('/p2VerifierLeaderboard/sw.js', {scope: '/p2VerifierLeaderboard/'})
}
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://bisaxa.github.io/p2VerifierLeaderboardBackend/", false);
xhr.send();
//var txtInput = fetch('output.txt')
//  .then(response => response.text())
//  .then(text => document.getElementById("table").innerHTML = text)
document.getElementById("table").innerHTML = xhr
