import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Friend } from 'src/app/models/Friend';
import { BackendService } from 'src/app/services/backend.service';
import { ContextService } from 'src/app/services/context.service';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
    public newFriend: string = ''

    public myFriends: Friend[] = []
    public myFriendsRequests: string[] = []

    public allUsers: string[] = []
    public suggestUsers: string[] = []

    public typeahead: FormControl = new FormControl();

    public constructor(
        private router: Router,
        private backendService: BackendService,
        private context: ContextService
    ) {
    }

    public ngOnInit(): void {
        this.getFriends()
        this.getUnreadMessages()
        this.getAllUsers()
    }

    private getFriends(): void {
        this.backendService.loadFriends()
        .then((friends: Friend[]) => {
            console.log(friends)
            friends.forEach(friend => {
                if (friend.status === 'accepted') {
                    this.myFriends.push(friend)
                } else if (friend.status === "requested") {
                    this.myFriendsRequests.push(friend.username)
                }
            })
          })

    }

    private getUnreadMessages(): void {
        this.backendService.unreadMessageCounts()
        .then((messages: Map<string, number>) => {
            messages.forEach((count: number, username: string) => {
                this.myFriends.forEach((friend) => {
                    if (friend.username === username) {
                        friend.unreadMessages = count
                    }
                })
            });
        })
    }

    private getAllUsers(): void {
        this.backendService.listUsers()
        .then((users: string[]) => {
            this.allUsers = users
            console.log(users)
          });
    }

    public addFriend(): void {
        if (!this.allUsers.includes(this.newFriend)) {
            alert("user no known")
            return
        }
        this.backendService.friendRequest(this.newFriend)
        this.myFriends.push(new Friend(this.newFriend, 'requested', 0))
        this.newFriend = ''
    }

    public chat(element: any): void {
        this.context.currentChatUsername = element.innerHTML;
        this.router.navigate(['/chat']);
    }

    public acceptRequest(username: string) {
        console.log("accept")
        this.backendService.acceptFriendRequest(username)
        
        this.myFriendsRequests.forEach((element,index)=>{
            if(element==username) this.myFriendsRequests.splice(index,1);
         });

        this.myFriends.push(new Friend(username, 'accepted', 0))
    }

    // TODO: something is wrong when rejecting request ...
    // API seams to create an accepted friend when request is send - to be clarified
    public rejectRequest(username: string) {
        console.log("reject")
        this.backendService.dismissFriendRequest(username)

        this.myFriendsRequests.forEach((element,index)=>{
            if(element==username) this.myFriendsRequests.splice(index,1);
         });
    }

    public suggest(): void {
        if (this.typeahead.value === '') {
            this.suggestUsers = []
            return
        }
        this.suggestUsers = this.allUsers
        .filter(c => c.startsWith(this.typeahead.value))
        .slice(0, 5);
    }

    public select(name: string): void {
        this.newFriend = name
        this.suggestUsers = []
    }
}