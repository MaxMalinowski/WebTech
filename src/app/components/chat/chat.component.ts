import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/Message';
import { Profile } from 'src/app/models/Profile';
import { User } from 'src/app/models/User';
import { BackendService } from 'src/app/services/backend.service';
import { ContextService } from 'src/app/services/context.service';
import { IntervalService } from 'src/app/services/interval.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  public chatUsername: string;
  public showLoadingIndicator: boolean = false;
  public allMessages: Message[] = [];
  public newMessage: string = '';
  public showSingleLined: boolean = true;
  @ViewChild('messagesDiv') private myScrollContainer: ElementRef;

  public constructor(
    private router: Router,
    private backendService: BackendService,
    private context: ContextService,
    private interval: IntervalService
  ) {
    this.myScrollContainer = new ElementRef(null);
    this.chatUsername = this.context.currentChatUsername;
  }

  public ngOnInit(): void {
    this.getAllMessages();
    this.getUserProfile();
  }

  public ngAfterViewChecked() {
    this.scrollToBottom();
  }

  public ngOnDestroy(): void {
    this.interval.clearIntervals();
    this.context.currentChatUsername = '';
  }

  private getAllMessages(): void {
    const _this = this;
    this.interval.setInterval('getMessages', () => {
      _this.backendService.listMessages(_this.chatUsername).then((messages: Message[]) => {
        this.allMessages = [];
        messages.forEach((msg) => {
          this.allMessages.push(new Message(msg.msg, msg.from, new Date(msg.time as any)));
        });
        this.showLoadingIndicator = false;
        this.scrollToBottom();
      });
    });
  }

  private getUserProfile(): void {
    this.backendService.loadUser(this.context.loggedInUsername).then((user: any) => {
      (user as Profile).layout === 'double' ? (this.showSingleLined = false) : (this.showSingleLined = true);
    });
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  public sendMessage(): void {
    this.backendService.sendMessage(this.chatUsername, this.newMessage);
    this.newMessage = '';
    this.showLoadingIndicator = true;
    this.scrollToBottom();
  }

  public removeFriend(): void {
    if (confirm(`Do you really want to remove ${this.chatUsername} as friend?`)) {
      this.backendService.removeFriend(this.chatUsername);
      this.router.navigate(['/friends']);
    }
  }
}
