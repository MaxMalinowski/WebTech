var messagesDisplayed = 0
var messagesOnServer = []

/**
 * Update every second to check if new messages available
 */
window.setInterval(function () {
    recieveMessages();
    if (messagesOnServer.length > messagesDisplayed) {
      appendMessages(messagesOnServer.slice(messagesDisplayed));
    }
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
function appendMessages(messagesToAppend) {
  
    var fieldsetElement = document.getElementById("chat");

    messagesToAppend.forEach(msg => {
      newElement = buildMessage(msg["from"], msg["msg"], msg["time"])
      fieldsetElement.appendChild(newElement);
      messagesDisplayed++
    });
    removeLoadingIndicator()
    scrollUpdate()
}

/**
 * Build a param-element representing a message in the chat
 */
function buildMessage(msgFrom, msgText, msgDate) {
  let newElement = document.createElement("table");
  let newMsgName = document.createElement("td");
  let newMsgText = document.createElement("td");
  let newMsgDate = document.createElement("td");

  newElement.classList.add("chat-message")
  newMsgName.classList.add("chat-message-name")
  newMsgText.classList.add("chat-message-text")
  newMsgDate.classList.add("chat-message-date")

  newMsgName.innerText = msgFrom + ":"
  newMsgText.innerText = msgText
  newMsgDate.innerText = (new Date(msgDate)).toLocaleString("en-DE")

  newElement.appendChild(newMsgName)
  newElement.appendChild(newMsgText)
  newElement.appendChild(newMsgDate)

  return newElement
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
    
    document.getElementById('message').value = ''
    insertLoadingIndicator()
    scrollUpdate()
    return false
}

/**
 * Insert a loading indicator
 */
function insertLoadingIndicator() {
    var fieldsetElement = document.getElementById("chat");

    let newDotContainer = document.createElement("div")
    let newFlashingDots = document.createElement("div")

    newDotContainer.id = "dot-container"
    newDotContainer.classList.add("dot-container")
    newFlashingDots.classList.add("dot-flashing")

    newDotContainer.appendChild(newFlashingDots)
    fieldsetElement.appendChild(newDotContainer)
}

/**
 * Remove a loading indicator
 */
function removeLoadingIndicator() {
  console.log("removing dots ...")
  let exists = document.getElementById("dot-container")
  if (exists != undefined) {
    document.getElementById("dot-container").remove()
  }
}

/**
 * Scroll down to the latest message
 */
function scrollUpdate() {
  console.log("updating scroll ...")
  var chatElement = document.getElementById("chat");
  chatElement.scrollTop = chatElement.scrollHeight;
}