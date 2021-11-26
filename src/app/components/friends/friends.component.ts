import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Friend } from 'src/app/models/Friend';
import { BackendService } from 'src/app/services/backend.service';
import { ContextService } from 'src/app/services/context.service';
import { IntervalService } from 'src/app/services/interval.service';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
    public userFriends: Friend[] = [];
    public userFriendRequests: string[] = [];
    public newFriendToAdd: string = '';
    public allAvailableUsers: string[] = [];
    public allUsersToSuggest: string[] = [];
    public typeaheadSuggestions: FormControl = new FormControl();

    public constructor(
        private router: Router,
        private backendService: BackendService,
        private context: ContextService,
        private interval: IntervalService
    ) {}

    public ngOnInit(): void {
        this.getFriends();
        this.getUnreadMessages();
        this.getAllUsers();
    }

    public ngOnDestroy(): void {
        this.interval.clearIntervals()
    }

    private getFriends(): void {
        const _this = this;
        this.interval.setInterval('getFriends', () => {
            _this.backendService.loadFriends().then((friends: Friend[]) => {
                _this.userFriends = [];
                _this.userFriendRequests = [];
                friends.forEach((friend) => {
                    if (friend.status === 'accepted') {
                        _this.userFriends.push(friend);
                    } else if (friend.status === 'requested') {
                        _this.userFriendRequests.push(friend.username);
                    }
                });
            });
        } )
    }

    private getUnreadMessages(): void {
        const _this = this;
        this.interval.setInterval('getUnreadMessages', () => {
            _this.backendService.unreadMessageCounts().then((messages: Map<string, number>) => {
                messages.forEach((count: number, username: string) => {
                    _this.userFriends.forEach((friend) => {
                        if (friend.username === username) {
                            friend.unreadMessages = count;
                        }
                    });
                });
            });
        });
    }

    private getAllUsers(): void {
        this.backendService.listUsers().then((users: string[]) => {
            this.allAvailableUsers = users;
        });
    }

    public startChatWithSelectedUsers(element: any): void {
        this.context.currentChatUsername = element.innerHTML;
        this.router.navigate(['/chat']);
    }

    public acceptFriendRequest(username: string) {
        this.backendService.acceptFriendRequest(username);
        this.userFriendRequests.forEach((element, index) => {
            if (element == username) this.userFriendRequests.splice(index, 1);
        });
    }

    // TODO: something is wrong when rejecting request ... - to be clarified
    public rejectFriendRequest(username: string) {
        this.backendService.dismissFriendRequest(username);
        this.userFriendRequests.forEach((element, index) => {
            if (element == username) this.userFriendRequests.splice(index, 1);
        });
    }

    public suggestKnownusers(): void {
        if (this.typeaheadSuggestions.value !== '') {
            this.allUsersToSuggest = this.allAvailableUsers
            .filter((c) => c.startsWith(this.typeaheadSuggestions.value))
            .slice(0, 5);
        } else {
            this.allUsersToSuggest = [];
        }
    }

    public selectUserFromSuggestions(name: string): void {
        this.newFriendToAdd = name;
        this.allUsersToSuggest = [];
    }

    public createNewFriendRequest(): void {
        if (this.allAvailableUsers.includes(this.newFriendToAdd)) {
            this.backendService.friendRequest(this.newFriendToAdd);
            this.userFriends.push(new Friend(this.newFriendToAdd, 'requested', 0));
            this.newFriendToAdd = '';
            this.allUsersToSuggest = [];
        } else {
            alert('Sorry, but the user you wish to add is not known :(');
            return;
        }        
    }
}
