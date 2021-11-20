import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Friend } from 'src/app/models/Friend';
import { User } from 'src/app/models/User';
import { BackendService } from 'src/app/services/backend.service';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
    public users:string[] = []

    public constructor(
        private router: Router,
        private backendService: BackendService
    ) {
    }

    public ngOnInit(): void {
        this.getFriendsList()
        this.getUsers()
    }

    private getFriendsList(): void {
        this.backendService.loadFriends()
        .then((friends: Friend[]) => {
            console.log(friends)
          });
    }

    private getUsers(): void {
        this.backendService.listUsers()
        .then((users: string[]) => {
            this.users = users
            console.log(users)
          });
    }
}
