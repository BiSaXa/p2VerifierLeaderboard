var txtInput = fetch('output.txt')
  .then(response => response.text())
  .then(text => document.getElementById("table").innerHTML = text)
