var messagesOnServer

/**
 * Update every second to check if new messages available
 */
window.setInterval(function () {
    recieveMessages();
    appendMessages();
}, 1000);

/**
 * Retrieve messages from the server
 */
function recieveMessages() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            messagesOnServer = JSON.parse(xmlhttp.responseText);
        }
    };
    let url = window.chatServer + window.chatCollectionId + "/message/Jerry";
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNjM1MDAyNDI5fQ.sXgsn2HsU0vZspogYuMhWLiWBNIZV5OGPBF-cdsNogQ"
    );
    xmlhttp.send();
}

/**
 * Create new message elements in chat if not yet displayed
 */
function appendMessages() {
    var fieldsetElement = document.getElementById("chat");
    fieldsetElement.textContent = '';

    messagesOnServer.forEach(msg => {
      let newElement = document.createElement("p");
      let newMsgName = document.createElement("span");
      let newMsgText = document.createElement("span");
      let newMsgDate = document.createElement("span");

      newElement.classList.add("chat-message")
      newMsgName.classList.add("chat-message-name")
      newMsgText.classList.add("chat-message-text")
      newMsgDate.classList.add("chat-message-date")

      newMsgName.innerText = msg["from"] 
      newMsgText.innerText = msg["msg"] 
      newMsgDate.innerText = (new Date(msg["time"])).toLocaleString("en-DE")

      newElement.appendChild(newMsgName)
      newElement.appendChild(newMsgText)
      newElement.appendChild(newMsgDate)
      fieldsetElement.appendChild(newElement);
    });
}

/**
 * Send new message to the server
 */
function sendMessage() {
    let messageText = { to: "Jerry", message: document.getElementById("message").value };
    let messageJson = JSON.stringify(messageText);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
            console.log("An error occured while sending the message ...");
        }
    };

    let url = window.chatServer + window.chatCollectionId + "/message";
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.setRequestHeader(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNjM1MDAyNDI5fQ.sXgsn2HsU0vZspogYuMhWLiWBNIZV5OGPBF-cdsNogQ"
    );
    xmlhttp.send(messageJson);
}
