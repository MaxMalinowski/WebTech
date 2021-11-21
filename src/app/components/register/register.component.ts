import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  benutzername: HTMLElement | null = null;
  passwort: HTMLElement | null = null;
  bestatigtPW: string = '';

  messageUser: string = '';
  messagePassword: string = '';
  messageConfirmedPW: string = '';

  hiddenUN: boolean = true;
  hiddenPW: boolean = true;
  hiddenCPW: boolean = true;

  usernameLengthStatus: any = { Value: false };
  usernameExistencyStatus: any = { Value: false };
  passwordLengthStatus: any = { Value: false };
  passwordConfirmationStatus: any = { Value: false };
  timer: any = null;

  public constructor(
    private router: Router,
    private backendService: BackendService
  ) {}

  public ngOnInit(): void {}

  public cancel(): void {
    this.router.navigate(['/login']);
  }

  public create(): void {
    if (
      !this.messageUser &&
      !this.messagePassword &&
      !this.messageConfirmedPW
    ) {
      this.router.navigate(['/friends']);
    }
  }

  //*********************************************************************copied*************************** */

  /**
   * Function to check to verify the username after 1 sec of no input
   * --> used in HTML files
   */
  public checkUsername(): void {
    this.benutzername = document.getElementById('benutzername');
    if (this.benutzername) {
      this.setStatus(this.usernameLengthStatus, this.benutzername, 'grey');
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (this.benutzername) {
          this.isUsernameValid(this.benutzername);
        }
      }, 1000);
    }
  }

  /**
   * Function to check, wheter the supplied password us least 8 characters
   * --> used in HTML files
   */
  public checkPassword(): void {
    var passwordElement = document.getElementById('passwort');

    if (passwordElement?.nodeValue && passwordElement.nodeValue.length < 8) {
      this.setStatus(this.passwordLengthStatus, passwordElement, 'red');
    } else if (passwordElement) {
      this.setStatus(this.passwordLengthStatus, passwordElement, 'green');
    }
  }

  /**
   * Function to check, wheter the supplied confirmation password matches the password
   * --> used in HTML files
   */
  public checkConfirmedPassword(): void {
    var passwordElement = document.getElementById('passwort');
    var confirmationElement = document.getElementById('bestatigtPW');

    if (
      passwordElement?.nodeValue &&
      confirmationElement?.nodeValue &&
      passwordElement.nodeValue === confirmationElement.nodeValue
    ) {
      this.setStatus(
        this.passwordConfirmationStatus,
        confirmationElement,
        'green'
      );
    } else if (confirmationElement) {
      this.setStatus(
        this.passwordConfirmationStatus,
        confirmationElement,
        'red'
      );
    }
  }

  /**
   * Function to check, whether the supplied values for username and password are ok
   * --> used in HTML files
   */
  public checkForm(): void {
    let valid = new Set([
      this.usernameLengthStatus.Value,
      this.usernameExistencyStatus.Value,
      this.passwordLengthStatus.Value,
      this.passwordConfirmationStatus.Value,
    ]);

    if (valid.size === 1 && valid.has(true)) {
      return;
    } else {
      this.writeAlert();
    }
  }

  /**
   * Function to set the border color of a specific element to a specific color
   */
  public setStatus(
    flag: { Value: boolean },
    element: HTMLElement,
    color: string
  ): void {
    element.style.border = '2px solid ' + color;

    if (color == 'green') {
      flag.Value = true;
    } else {
      flag.Value = false;
    }
  }

  /**
   * Fucntion to check whether the supplied username is at least 3 characters long and doesn't already exist
   */
  public isUsernameValid(usernameElement: HTMLElement): void {
    if (usernameElement.nodeValue && usernameElement.nodeValue.length < 3) {
      this.setStatus(this.usernameLengthStatus, usernameElement, 'red');
    } else {
      this.setStatus(this.usernameLengthStatus, usernameElement, 'green');
      this.doesUserExist(usernameElement);
    }
  }

  /**
   * Function to execute a server request to check whether a username already exists or not
   */
  public async doesUserExist(usernameElement: HTMLElement): Promise<void> {
    const userlist: Promise<string[]> = this.backendService.listUsers();
    (await userlist).forEach((element) => {
      if (this.benutzername?.nodeValue === element) {
        this.setStatus(this.usernameExistencyStatus, usernameElement, 'red');
      } else {
        this.setStatus(this.usernameExistencyStatus, usernameElement, 'green');
      }
    });
  }

  /**
   * Function for Alerts
   */
  public writeAlert(): void {
    if (!this.usernameExistencyStatus.Value) {
      this.messageUser = this.messageUser + '\nUsername already exists';
    }

    if (!this.usernameLengthStatus.Value) {
      this.messageUser =
        this.messageUser + '\nUsername must consist of at least 3 characters';
    }

    if (!this.passwordLengthStatus.Value) {
      this.messagePassword =
        this.messagePassword +
        '\nPassword must consist of at least 8 characters';
    }

    if (!this.passwordConfirmationStatus.Value) {
      this.messageConfirmedPW =
        this.messageConfirmedPW + '\nPasswords do not match';
    }

    if (this.messageUser) {
      this.hiddenUN = false;
    }
    if (this.messagePassword) {
      this.hiddenPW = false;
    }

    if (this.messageConfirmedPW) {
      this.hiddenCPW = false;
    }
  }
}
