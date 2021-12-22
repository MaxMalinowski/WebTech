var messagesDisplayed = 0;
var messagesOnServer = [];

/**
 * Update every second to check if new messages available
 * --> Function not called explicitly, but continously every 1 second
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
function recieveMessages(friend) {
 
  let url = window.chatServer + window.chatCollectionId + "/message/"+ friend;
  console.log(url)
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
function appendMessages(messagesToAppend) {
  var fieldsetElement = document.getElementById("chat");
  messagesToAppend.forEach((msg) => {
    newElement = buildMessage(msg["from"], msg["msg"], msg["time"]);
    fieldsetElement.appendChild(newElement);
    messagesDisplayed++;
  });

  scrollUpdate();
}

/**
 * Build a param-element representing a message in the chat
 */
function buildMessage(msgFrom, msgText, msgDate) {
  let newElement = document.createElement("table");
  let newMsgName = document.createElement("td");
  let newMsgText = document.createElement("td");
  let newMsgDate = document.createElement("td");

  newElement.classList.add("chat-message");
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
