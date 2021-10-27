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
  let messageText = document.getElementById("message").value;
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
      console.log("done...");
    }
  };
  var url = window.chatServer + "/chat/" + window.chatCollectionId + "/message";
  xmlhttp.open("POST", url, true);

  let data = {
    message: messageText,
    to: "Jerry",
  };
  let jsonString = JSON.stringify(data);
  xmlhttp.send(jsonString);
}

/**
 * Nachrichten empfangen
 */
function receiveMessage() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      let data = JSON.parse(xmlhttp.responseText);
      console.log(data);
    }
  };
  var url =
    window.chatServer + "/chat/" + window.chatCollectionId + "/message/Jerry";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
