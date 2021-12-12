import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {

  constructor( private backendService: BackendService, private context: ContextService) {}

  ngOnInit(): void {
    this.context.clearContext();
    this.backendService.unsetUser();
  }
}
