import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public message: string = '';
  public validLogin: boolean = false;

  public constructor(private router: Router, private backendService: BackendService) {}

  public ngOnInit(): void {}

  public register(): void {
    this.router.navigate(['/register']);
  }

  public login(): void {
    if (this.username === '' || this.password === '') {
      this.validLogin = false;
      this.message = 'Please login in with a username and password!';
      return;
    } else {
      this.backendService.login(this.username, this.password).then((ok: boolean) => {
        if (ok) {
          this.router.navigate(['/friends']);
        } else {
          this.validLogin = false;
          this.message = 'Authentication failed! Either the username or the password is incorrect!';
        }
      });
    }
  }
}
