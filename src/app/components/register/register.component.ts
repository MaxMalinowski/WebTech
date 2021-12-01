import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FieldState } from 'src/app/models/FieldState';
import { BackendService } from 'src/app/services/backend.service';

//Decorator
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public validRegister: boolean = false;
  public generalMessage: string = '';

  public usernameState: FieldState = new FieldState();
  public passwordState: FieldState = new FieldState();
  public confirmState: FieldState = new FieldState();

  public static messages: any = {
    msgError: 'Something went wrong. Please try again.',
    msgUsernameExists: 'This username already exists. Please choose another one.',
    msgUsernameLength: 'This username is too short.',
    msgPasswordLength: 'The supplied password is too short. Please choose a longer one.',
    msgPasswordsMatch: 'The passwords do not match.',
  };

  public constructor(private router: Router, private backendService: BackendService) {}

  public ngOnInit(): void {}

  public cancel(): void {
    this.router.navigate(['/login']);
  }

  private setState(obj: FieldState, ok: boolean, msg: string) {
    obj.ok = ok;
    obj.msg = msg;
    obj.border = (ok) ? '2px solid green' : '2px solid red'
    this.validRegister = this.usernameState.ok && this.passwordState.ok && this.confirmState.ok && true;
  }

  public register(): void {
    this.backendService.register(this.usernameState.value, this.passwordState.value).then((ok: boolean) => {
      ok ? this.router.navigate(['/friends']) : (this.generalMessage = RegisterComponent.messages.msgError);
    });
  }

  public checkUsername(): void {
    if (this.usernameState.value.length < 3) {
      this.setState(this.usernameState, false, RegisterComponent.messages.msgUsernameLength);
    } else {
      this.backendService.userExists(this.usernameState.value).then((exists: boolean) => {
        if (exists) {
          this.setState(this.usernameState, false, RegisterComponent.messages.msgUsernameExists);
        } else {
          this.setState(this.usernameState, true, '');
        }
      });
    }
  }

  public checkPassword(): void {
    if (this.passwordState.value.length < 8) {
      this.setState(this.passwordState, false, RegisterComponent.messages.msgPasswordLength);
    } else {
      this.setState(this.passwordState, true, '');
    }
  }

  public checkConfirmedPassword(): void {
    if (this.passwordState.ok) {
      if (this.passwordState.value === this.confirmState.value) {
        this.setState(this.confirmState, true, '');
      } else {
        this.setState(this.confirmState, false, RegisterComponent.messages.msgPasswordsMatch);
      }
    }
  }
}
