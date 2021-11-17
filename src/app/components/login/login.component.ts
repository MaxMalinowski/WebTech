import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router }            from '@angular/router';
import {BackendService } from '../../services/backend.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public benutzername: string = "";
    public passwort: string = "";
    public message: string = "";
    public farbe: string = "";

    public constructor(
        private router: Router,
        private backendService: BackendService) { }

    public ngOnInit(): void {}

    public register(): void {
        this.router.navigate(['/register'])
    }

    public login(form: Form): void {
        this.backendService.login(this.benutzername, this.passwort) .then((ok: boolean) => {
            if (ok) {
                console.log('login successful!'); 
                this.router.navigate([ '/friends' ]);
            } else {
                this.message = 'Authentication failed!';
            } });
    }
    username(username: any, password: any) {
        throw new Error('Method not implemented.');
    }
    password(username: any, password: any) {
        throw new Error('Method not implemented.');
    }
}
