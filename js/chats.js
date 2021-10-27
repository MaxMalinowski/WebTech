/**
 * Aktualisiert die Seite jede Sekunde
 */
function update() {
  window.setInterval(function () {
    location.reload();
    console.log("updated");
  }, 1000);
}

/**
 * Nachrichten versenden
 */
function sendMessage() {
  let message = document.getElementById("message").value;
  var url =
    window.chatServer +
    "/" +
    window.chatCollectionId +
    "/chat/" +
    message.value;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", url, true);
  xmlhttp.send();
}

/**
 * Nachrichten empfangen
 */
function receiveMessage() {
  var url = window.chatServer + "/" + window.chatCollectionId + "/chat";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
