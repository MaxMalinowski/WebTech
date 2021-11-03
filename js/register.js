// Variables to store the state of the form
var usernameStatus = false;
var passwordStatus = false;
var confirmStatus = false;
var timer = null;
var message = "";
var usernameElement = "";

// Function to set the border color of a specific element to a specific color
function setStatus(flag, element, color) {
  if (color == "green") {
    flag = true;
  } else {
    flag = false;
  }

  element.style.border = "2px solid " + color;
}

// Function to check to verify the username after 1 sec of no input
function checkUsername() {
  usernameElement = document.getElementById("username");
  setStatus(usernameStatus, usernameElement, "grey");
  clearTimeout(timer);
  timer = setTimeout(() => {
    isUsernameValid(usernameElement);
  }, 1000);
}

// Fucntion to check whether the supplied username is at least 3 characters long and doesn't already exist
function isUsernameValid(usernameElement) {
  if (usernameElement.value.length < 3) {
    setStatus(usernameStatus, usernameElement, "red");
    return false;
  } else {
    doesUserExist(usernameElement);
  }
}

// Function to execute a server request to check whether a username already exists or not
function doesUserExist(usernameElement) {
  var url =
    window.chatServer +
    "/" +
    window.chatCollectionId +
    "/user/" +
    usernameElement.value;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
      setStatus(usernameStatus, usernameElement, "red");
      return true;
    } else if (xmlhttp.status == 404) {
      setStatus(usernameStatus, usernameElement, "green");
      return false;
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

//Function to check, wheter the supplied password us least 8 characters
function checkPassword() {
  var passwordElement = document.getElementById("password");

  if (passwordElement.value.length < 8) {
    setStatus(passwordStatus, passwordElement, "red");
    return false;
  } else {
    setStatus(passwordStatus, passwordElement, "green");
    return true;
  }
}

// Function to check, wheter the supplied confirmation password matches the password
function checkConfirmedPassword() {
  var passwordElement = document.getElementById("password");
  var confirmationElement = document.getElementById("confirm");

  if (passwordElement.value === confirmationElement.value) {
    setStatus(confirmStatus, confirmationElement, "green");
    return true;
  } else {
    setStatus(confirmStatus, confirmationElement, "red");

    return false;
  }
}

// Function to check, whether the supplied values for username and password are ok
function checkForm() {
  return new Set([usernameStatus, passwordStatus, confirmStatus]).size === 1
    ? true
    : false;
}

//Function for Alerts
function writeAlert() {
  if (!isUsernameValid(usernameElement)) {
    message = message + "\nUsername must consist of at least 3 characters";
  }

  if (doesUserExist(usernameElement)) {
    message = message + "\nUsername already exists";
  }

  if (!checkPassword()) {
    message = message + "\nPassword must consist of at least 8 characters";
  }

  if (!checkConfirmedPassword()) {
    message = message + "\nPasswords do not match";
  }
  if (message !== "") {
    alert(message);
  } else {
    window.location.href = "./friends.html";
  }
}
