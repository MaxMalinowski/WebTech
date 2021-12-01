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
  public username: string = '';
  public password: string = '';
  public confirmedPassword: string = '';

  public usernameLengthStatus: boolean = false;
  public usernameExistencyStatus: boolean = false;
  public passwordLengthStatus: boolean = false;
  public passwordConfirmationStatus: boolean = false;

  public generalMessage: string = '';
  public usernameMessage: string = '';
  public passwordMessage: string = '';
  public confirmMessage: string = '';
  public static messages: any = {
    msgError: 'Something went wrong. Please try again.',
    msgUsernameExists:
      'This username already exists. Please choose another one.',
    msgUsernameLength: 'This username is too short.',
    msgPasswordLength:
      'The supplied password is too short. Please choose a longer one.',
    msgPasswordsMatch: 'The passwords do not match.',
  };

  public constructor(
    private router: Router,
    private backendService: BackendService
  ) {}

  public ngOnInit(): void {}

  public cancel(): void {
    this.router.navigate(['/login']);
  }

  public register(): void {
    this.backendService.register(this.username, this.password)
      .then((ok: boolean) => {
        if (ok) {
          this.router.navigate(['/friends']);
        } else {
          this.generalMessage = RegisterComponent.messages.msgError;
        }
      });
  }

  public checkUsername(): void {
    if (this.username.length < 3) {
      this.usernameLengthStatus = false;
      this.usernameMessage = RegisterComponent.messages.msgUsernameLength;
    } else {
      this.usernameLengthStatus = true;
      this.backendService.userExists(this.username).then((exists: boolean) => {
        if (exists) {
          this.usernameExistencyStatus = false;
          this.usernameMessage = RegisterComponent.messages.msgUsernameExists;
        } else {
          this.usernameExistencyStatus = true;
          this.usernameMessage = '';
        }
      });
    }
  }

  public checkPassword(): void {
    if (this.password.length < 8) {
      this.passwordLengthStatus = false;
      this.passwordMessage = RegisterComponent.messages.msgPasswordLength;
    } else {
      this.passwordLengthStatus = true;
      this.passwordMessage = '';
    }
  }

  public checkConfirmedPassword(): void {
    if (this.passwordLengthStatus) {
      if (this.password === this.confirmedPassword) {
        this.passwordConfirmationStatus = true;
        this.confirmMessage = '';
      } else {
        this.passwordConfirmationStatus = false;
        this.confirmMessage = RegisterComponent.messages.msgPasswordsMatch;
      }
    }
  }

  public disableRegister(): boolean {
    if (
      (((this.usernameLengthStatus === this.usernameExistencyStatus) ===
        this.passwordLengthStatus) ===
        this.passwordConfirmationStatus) ===
      true
    ) {
      return false;
    } else {
      return true;
    }
  }
}
