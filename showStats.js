if (navigator.serviceWorker) {
		navigator.serviceWorker.register('/p2VerifierLeaderboard/sw.js', {scope: '/p2VerifierLeaderboard/'})
}
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
//let xhr = new XMLHttpRequest();
//xhr.open("GET", "https://bisaxa.github.io/p2VerifierLeaderboardBackend/" + ((/\?/).test("https://bisaxa.github.io/p2VerifierLeaderboardBackend/") ? "&" : "?") + (new Date()).getTime(), false);
//xhr.send();
//var txtInput = fetch('https://bisaxa.github.io/p2VerifierLeaderboardBackend/')
//  .then(response => response.text())
//  .then(text => document.getElementById("table").innerHTML = text)
document.getElementById("table").innerHTML = setText("https://bisaxa.github.io/p2VerifierLeaderboardBackend/");
