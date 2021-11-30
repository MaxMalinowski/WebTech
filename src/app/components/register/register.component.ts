import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

//Decorator
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  benutzername: string = '';
  passwort: string = '';
  bestatigtPW: string = '';

  messageUser: string = '';
  messageUserNameWrong: string = '';
  messageUserExists: string = '';
  messagePassword: string = '';
  messageConfirmedPW: string = '';

  hiddenUN: boolean = true;
  hiddenPW: boolean = true;
  hiddenCPW: boolean = true;
  disabledRegister: boolean = true;

  usernameLengthStatus: any = { Value: false };
  usernameExistencyStatus: any = { Value: false };
  passwordLengthStatus: any = { Value: false };
  passwordConfirmationStatus: any = { Value: false };
  timer: any = null;

  public constructor(
    private router: Router,
    private backendService: BackendService
  ) {}

  public ngOnInit(): void {
    this.setRegisterButton();
  }

  public cancel(): void {
    this.router.navigate(['/login']);
  }

  public async create(): Promise<void> {
    alert('create');
    if (this.checkStates()) {
      if (
        await this.backendService.register(this.benutzername, this.passwort)
      ) {
        this.router.navigate(['/friends']);
      } else {
        this.messageUser = 'username already exists';
        this.hiddenUN = false;
        this.resetInputs();
      }
    }
  }

  /**reset all inputs */
  public resetInputs(): void {
    this.benutzername = '';
    this.passwort = '';
    this.bestatigtPW = '';
    this.usernameLengthStatus = { Value: false };
    this.passwordLengthStatus = { Value: false };
    this.passwordConfirmationStatus = { Value: false };
    var password = document.getElementById('passwort');
    var username = document.getElementById('benutzername');
    var bestatigtPW = document.getElementById('bestatigtPW');
    if (username) {
      this.setStatus(this.usernameLengthStatus, username, 'grey');
    }
    if (password) {
      this.setStatus(this.passwordLengthStatus, password, 'grey');
    }
    if (bestatigtPW) {
      this.setStatus(this.passwordConfirmationStatus, bestatigtPW, 'grey');
    }
    this.setRegisterButton();
  }

  /**
   * check all States
   */
  public checkStates(): boolean {
    if (
      this.usernameLengthStatus.Value ===true &&
      this.usernameExistencyStatus.Value ===true &&
      this.passwordConfirmationStatus.Value ===true &&
      this.passwordLengthStatus.Value ===true
    ) {
      return true;
    }
    return false;
  }

  /**
   * Function to check to verify the username after 1 sec of no input
   * --> used in HTML files
   */
  public checkUsername(): void {
    var usernameElement = document.getElementById('benutzername');
    if (usernameElement) {
      this.setStatus(this.usernameLengthStatus, usernameElement, 'grey');
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (usernameElement) {
          this.isUsernameValid(usernameElement);

          this.messageUser = this.messageUserExists + this.messageUserNameWrong;
          if (this.messageUser !== '') {
            this.hiddenUN = false;
          } else {
            this.hiddenUN = true;
          }
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
    if (passwordElement && this.passwort.length < 8) {
      this.setStatus(this.passwordLengthStatus, passwordElement, 'red');
      this.messagePassword = '\nPassword must consist of at least 8 characters';
      this.hiddenPW = false;
    } else if (passwordElement) {
      this.setStatus(this.passwordLengthStatus, passwordElement, 'green');
      this.messagePassword = '';
      this.hiddenPW = true;
    }
    this.setRegisterButton();
  }

  /**
   * Function to check, wheter the supplied confirmation password matches the password
   * --> used in HTML files
   */
  public checkConfirmedPassword(): void {
    var confiremdPasswordElement = document.getElementById('bestatigtPW');
    if (confiremdPasswordElement && this.passwort === this.bestatigtPW) {
      this.setStatus(
        this.passwordConfirmationStatus,
        confiremdPasswordElement,
        'green'
      );
      this.messageConfirmedPW = '';
      this.hiddenCPW = true;
    } else if (confiremdPasswordElement) {
      this.setStatus(
        this.passwordConfirmationStatus,
        confiremdPasswordElement,
        'red'
      );
      this.messageConfirmedPW = '\nPasswords do not match';
      this.hiddenCPW = false;
    }
    this.setRegisterButton();
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
   * set register button
   */
  public setRegisterButton() {
    var button = document.getElementById('register');
    if (button) {
      if (this.checkStates()) {
        this.disabledRegister = false;
        button.style.background = 'dodgerblue';
      } else {
        this.disabledRegister = true;
        button.style.background = 'lightblue';
      }
    }
  }

  /**
   * Fucntion to check whether the supplied username is at least 3 characters long and doesn't already exist
   */
  public isUsernameValid(usernameElement: HTMLElement): void {
    if (this.benutzername.length < 3) {
      this.setStatus(this.usernameLengthStatus, usernameElement, 'red');
      this.messageUserNameWrong =
        '\nUsername must consist of at least 3 characters';
    } else {
      this.messageUserNameWrong = '';
      this.setStatus(this.usernameLengthStatus, usernameElement, 'green');
    }
    this.setRegisterButton();
  }
}
