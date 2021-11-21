import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  benutzername: string;
  passwort: string;
  bestatigtPW: string;

  messageUser: string;
  messagePassword: string;
  messageConfirmedPW: string;

  hiddenUN: boolean;
  hiddenPW: boolean;
  hiddenCPW: boolean;

  usernameLengthStatus : any;
 usernameExistencyStatus: any ;
 passwordLengthStatus : any;
 passwordConfirmationStatus : any;
 timer: any

  public constructor(private router: Router) {
    this.benutzername = '';
    this.passwort = '';
    this.bestatigtPW = '';

    this.messageUser = 'Message User';
    this.messagePassword = 'Message Password';
    this.messageConfirmedPW = 'Message Confirmed';

    this.hiddenUN = true;
    this.hiddenPW = true;
    this.hiddenCPW = true;

    this.usernameLengthStatus = { Value: false };
    this.usernameExistencyStatus = { Value: false };
    this.passwordLengthStatus = { Value: false };
    this.passwordConfirmationStatus = { Value: false };
    this.timer = null;
  }

  public ngOnInit(): void {}

  public cancel(): void {
    this.router.navigate(['/login']);
  }

  public create(): void {
    this.router.navigate(['/friends']);
  }

  //*********************************************************************copied*************************** */



/**
 * Function to check to verify the username after 1 sec of no input
 * --> used in HTML files
 */
function checkUsername() {
    usernameElement = document.getElementById("username");
    setStatus(usernameLengthStatus, usernameElement, "grey");
    clearTimeout(timer);
    timer = setTimeout(() => {
        isUsernameValid(usernameElement);
    }, 1000);
}

/**
 * Function to check, wheter the supplied password us least 8 characters
 * --> used in HTML files
 */
function checkPassword() {
    var passwordElement = document.getElementById("password");

    if (passwordElement.value.length < 8) {
        setStatus(passwordLengthStatus, passwordElement, "red");
    } else {
        setStatus(passwordLengthStatus, passwordElement, "green");
    }
}

/**
 * Function to check, wheter the supplied confirmation password matches the password
 * --> used in HTML files
 */
function checkConfirmedPassword() {
    var passwordElement = document.getElementById("password");
    var confirmationElement = document.getElementById("confirm");

    if (passwordElement.value === confirmationElement.value) {
        setStatus(passwordConfirmationStatus, confirmationElement, "green");
    } else {
        setStatus(passwordConfirmationStatus, confirmationElement, "red");
    }
}

/**
 * Function to check, whether the supplied values for username and password are ok
 * --> used in HTML files
 */
function checkForm() {
    let valid = new Set([
        usernameLengthStatus.Value,
        usernameExistencyStatus.Value,
        passwordLengthStatus.Value,
        passwordConfirmationStatus.Value,
    ]);

    if (valid.size === 1 && valid.has(true)) {
        return true;
    } else {
        return writeAlert();
    }
}

/**
 * Function to set the border color of a specific element to a specific color
 */
function setStatus(flag, element, color) {
    element.style.border = "2px solid " + color;

    if (color == "green") {
        flag.Value = true;
    } else {
        flag.Value = false;
    }
}

/**
 * Fucntion to check whether the supplied username is at least 3 characters long and doesn't already exist
 */
function isUsernameValid(usernameElement) {
    if (usernameElement.value.length < 3) {
        setStatus(usernameLengthStatus, usernameElement, "red");
    } else {
        setStatus(usernameLengthStatus, usernameElement, "green");
        doesUserExist(usernameElement);
    }
}

/**
 * Function to execute a server request to check whether a username already exists or not
 */
function doesUserExist(usernameElement) {
    var url = window.chatServer + "/" + window.chatCollectionId + "/user/" + usernameElement.value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
            setStatus(usernameExistencyStatus, usernameElement, "red");
        } else if (xmlhttp.status == 404) {
            setStatus(usernameExistencyStatus, usernameElement, "green");
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/**
 * Function for Alerts
 */
function writeAlert() {
    let message = "";

    if (!usernameExistencyStatus.Value) {
        message = message + "\nUsername already exists";
    }

    if (!usernameLengthStatus.Value) {
        message = message + "\nUsername must consist of at least 3 characters";
    }

    if (!passwordLengthStatus.Value) {
        message = message + "\nPassword must consist of at least 8 characters";
    }

    if (!passwordConfirmationStatus.Value) {
        message = message + "\nPasswords do not match";
    }

    if (message !== "") {
        alert(message);
        return false;
    }
}
}
