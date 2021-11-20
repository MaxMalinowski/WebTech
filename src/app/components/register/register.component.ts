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
  }

  public ngOnInit(): void {}

  
}
