import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { Friend } from 'src/app/models/Friend';
import { User } from 'src/app/models/User';
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

    public constructor(
        private router: Router,
        private backendService: BackendService,
        private context: ContextService
    ) {
    }

    public ngOnInit(): void {
        this.getUser()
        this.getUsers()
    }

    private getUser(): void {
        this.backendService.loadFriends()
        .then((friends: Friend[]) => {
            friends.forEach(friend => {
                if (friend.status === 'accepted') {
                    friend.unreadMessages = 0
                    this.myFriends.push(friend)
                } else if (friend.status === "requested") {
                    this.myFriendsRequests.push(friend.username)
                }
            })
          });
    }

    private getUsers(): void {
        this.backendService.listUsers()
        .then((users: string[]) => {
            this.allUsers = users
            console.log(users)
          });
    }

    public addFriend(): void {
        this.backendService.friendRequest(this.newFriend)
        this.myFriends.push(new Friend(this.newFriend, 'accepted', 0))
        this.newFriend = ''
    }

    public chat(element: any): void {
        this.context.currentChatUsername = element.innerHTML;
        this.router.navigate(['/chat']);
    }

    public acceptRequest(username: string) {
        this.backendService.acceptFriendRequest(username)
        
        this.myFriendsRequests.forEach((element,index)=>{
            if(element==username) this.myFriendsRequests.splice(index,1);
         });

        this.myFriends.push(new Friend(username, 'accepted', 0))
    }

    public rejectRequest(username: string) {
        this.backendService.dismissFriendRequest(username)
    }
}

    // public showSuggestions(): void {
    //     this.suggestUsers = []
    //     this.allUsers.forEach((user) => {
    //         if (user.startsWith(this.newFriend)) {
    //             this.suggestUsers.push(user)
    //         }
    //     })
    //     this.createSuggestions()
    // }

    // public createSuggestions() {
    //     let sugggestionList = document.createElement("ul");
    //     sugggestionList.classList.add("suggestion-list");

    //     let autocompleteDiv = document.getElementById("autocomplete-div")
    //     if (autocompleteDiv !== null) {
    //         autocompleteDiv.innerText = "";
    //         autocompleteDiv.appendChild(sugggestionList);
    //     } else {
    //         console.log("should no be here ...")
    //     }

    //     this.suggestUsers.forEach((item) => {
    //         sugggestionList.appendChild(this.createAutocompleteListItem(item));
    // });

    // }
    // public createAutocompleteListItem(suggestion: string) {
    //     let listItem = document.createElement("li");
    //     listItem.classList.add("suggestion-item");
    //     listItem.innerText = suggestion;
    //     //listItem.setAttribute("(onclick)", "selectSuggestion(this)");
    //     return listItem;
    // }

    // public selectSuggestion(item: any) {
    //     this.newFriend = item.value
    // }