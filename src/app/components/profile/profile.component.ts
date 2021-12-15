import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { Profile } from 'src/app/models/Profile';
import { ContextService } from 'src/app/services/context.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public currentChatUsername: string = '';

    public userProfile: Profile = new Profile();

    public constructor(private router: Router, private backendService: BackendService, private context: ContextService) {
        this.currentChatUsername = this.context.currentChatUsername; 
    }

    public ngOnInit(): void {
        this.backendService
        .loadUser(this.currentChatUsername)
        .then((user:any) => {
            if(user == null) {
                this.router.navigate(['/login']);
            } else {
                this.userProfile.firstName = user.firstName ? user.firstName: '';
                this.userProfile.coffeeOrTea = user.coffeeOrTea ? user.coffeeOrTea: '1';
                this.userProfile.description = user.description ? user.description: '';
            }
        })
    }

    public removeFriend(): void {
        if (confirm(`Do you really want to remove ${this.currentChatUsername} as friend?`)) {
            this.backendService.removeFriend(this.currentChatUsername);
            this.router.navigate(['/friends']);
        } 
    }

}
