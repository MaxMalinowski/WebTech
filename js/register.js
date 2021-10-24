/*
Function to check, wheter the supplied username for registration satisfies the following criteria:
- username has at least 3 characters
- username does not already exists on the server
*/
function checkUsername() {
    var usernameElement = document.getElementById("username");
    usernameElement.value.length < 3 
    ? _setBorderColor(usernameElement, "red") 
    : _userExists(usernameElement);
}

/*
Function to execute a server request to check whether a username already exists or not
- Response 404: username does not exists -> good
- Response 204: username does exists -> bad
*/
function _userExists(usernameElement) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
            _setBorderColor(usernameElement, "red");
        } else if (xmlhttp.status == 404) {
            _setBorderColor(usernameElement, "green");
        }
    };

    var url = window.chatServer + "/" + window.chatCollectionId + "/user/" + usernameElement.value;
    console.log(url);
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/*
Function to check, wheter the supplied password for registration satisfies the following criteria:
- password least 8 characters
*/
function checkPassword() {
    var passwordElement = document.getElementById("password");
    passwordElement.value.length < 8
        ? _setBorderColor(passwordElement, "red")
        : _setBorderColor(passwordElement, "green");
}

/*
Function to check, wheter the supplied confirmation password for registration satisfies the following criteria:
- confirmation password matches the password
*/
function checkConfirmedPassword() {
    var passwordElement = document.getElementById("password");
    var confirmationElement = document.getElementById("confirm");
    passwordElement.value === confirmationElement.value 
    ? _setBorderColor(confirmationElement, "green")
    : _setBorderColor(confirmationElement, "red");
}

/*
Function to set the border color of a specific element to a specific color
*/
function _setBorderColor(element, color) {
    element.style.borderColor = color;
}
