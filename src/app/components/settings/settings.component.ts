import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { Profile } from 'src/app/models/Profile';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    public userProfile: Profile = new Profile();

    public constructor(private router: Router, private backendService: BackendService) {
    }

    public ngOnInit(): void {
        this.backendService
        .loadCurrentUser()
        .then((user:any) => {
            if(user == null) {
                this.router.navigate(['/login']);
            } else {
                this.userProfile.firstName = user.firstName ? user.firstName: '';
                this.userProfile.lastName = user.lastName ? user.lastName: '';
                this.userProfile.coffeeOrTea = user.coffeeOrTea ? user.coffeeOrTea: '1';
                this.userProfile.description = user.description ? user.description: '';
                this.userProfile.layout = user.layout ? user.layout: '';
            }
        })
    }

    public save(): void {
        this.backendService.saveCurrentUserProfile(this.userProfile);
    }

    public cancel(): void {
        this.router.navigate(['/friends']);
    }
}
