import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {

  constructor( private backendService: BackendService,) {}

  ngOnInit(): void {
    this.backendService.unsetUser()
  }
}
