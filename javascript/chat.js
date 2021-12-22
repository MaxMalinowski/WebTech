var messagesDisplayed = 0;
var messagesOnServer = [];

/**
 * Retrieve messages from the server
 */
function recieveMessages(friend) {
  let url =
    window.chatServer + "/" + window.chatCollectionId + "/message/" + friend;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      messagesOnServer = JSON.parse(xmlhttp.responseText);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.setRequestHeader("Authorization", "Bearer " + window.authToken);
  xmlhttp.send();
}

/**
 * Create new message elements in chat if not yet displayed
 */
function appendMessages(messagesToAppend, layout) {
  var fieldsetElement = document.getElementById("chat");
  messagesToAppend.forEach((msg) => {
    newElement = buildMessage(msg["from"], msg["msg"], msg["time"], layout);
    fieldsetElement.appendChild(newElement);
    messagesDisplayed++;
  });
  removeLoadingIndicator();
  scrollUpdate();
}

/**
 * Build a param-element representing a message in the chat
 */
function buildMessage(msgFrom, msgText, msgDate, layout) {
  let newElement = document.createElement("table");
  let newMsgName = document.createElement("td");
  let newMsgText = document.createElement("td");
  let newMsgDate = document.createElement("td");
console.log(layout)
  if (layout === "seperatedLines") {
    newElement.classList.add("chat-message-double-lined");
  } else {
    newElement.classList.add("chat-message");
  }

  newMsgName.classList.add("chat-message-name");
  newMsgText.classList.add("chat-message-text");
  newMsgDate.classList.add("chat-message-date");

  newMsgName.innerText = msgFrom + ":";
  newMsgText.innerText = msgText;
  newMsgDate.innerText = new Date(msgDate).toLocaleString("en-DE");

  newElement.appendChild(newMsgName);
  newElement.appendChild(newMsgText);
  newElement.appendChild(newMsgDate);

  return newElement;
}

/**
 * Scroll down to the latest message
 */
function scrollUpdate() {
  console.log("updating scroll ...");
  var chatElement = document.getElementById("chat");
  chatElement.scrollTop = chatElement.scrollHeight;
}

/**
 * Insert a loading indicator
 */
function insertLoadingIndicator() {
  var fieldsetElement = document.getElementById("chat");

  let newDotContainer = document.createElement("div");
  let newFlashingDots = document.createElement("div");

  newDotContainer.id = "dot-container";
  newDotContainer.classList.add("dot-container");
  newFlashingDots.classList.add("dot-flashing");

  newDotContainer.appendChild(newFlashingDots);
  fieldsetElement.appendChild(newDotContainer);
}

/**
 * Remove a loading indicator
 */
function removeLoadingIndicator() {
  console.log("removing dots ...");
  let exists = document.getElementById("dot-container");
  if (exists != undefined) {
    document.getElementById("dot-container").remove();
  }
}
