import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  dotContainer: HTMLElement | undefined;

  // DIV für Nachrichten (s. Template) als Kind-Element für Aufrufe (s. scrollToBottom()) nutzen
  @ViewChild('messagesDiv') private myScrollContainer: ElementRef;

  // Access chat username from context
  public chatUsername: string = this.context.currentChatUsername;
  public messageToSend: string = '';

  messagesDisplayed: number = 0;
  messagesOnServer: Array<Message> = [];

  public constructor(
    private backendService: BackendService,
    private context: ContextService
  ) {
    this.myScrollContainer = new ElementRef(null);
  }

  public ngAfterViewChecked() {
    this.scrollToBottom();
  }

  /**
   * Setzt in der Nachrichtenliste die Scrollposition ("scrollTop") auf die DIV-Größe ("scrollHeight"). Dies bewirkt ein
   * Scrollen ans Ende.
   */
  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  public ngOnInit(): void {
    this.scrollToBottom();
  }

  /**
   * Update every second to check if new messages available
   * --> Function not called explicitly, but continously every 1 second
   */
  /*  window.setInterval(function () {
         this.recieveMessages();
         if (this.messagesOnServer.length > this.messagesDisplayed) {
             this.appendMessages(this.messagesOnServer.slice(this.messagesDisplayed));
         }
     }, 1000);*/

  /**
   * Send new message to the server
   * --> Function used in HTML files
   */
  public sendMessage(): void {
    this.backendService.sendMessage(this.chatUsername, this.messageToSend);
    this.insertLoadingIndicator();
    this.scrollToBottom();
  }

  public async showMessages(): Promise<void> {
    var fieldsetElement = document.getElementById('chat');
    var messages = await this.backendService.listMessages(this.chatUsername);
    for (const msg of messages) {
      const newElement = this.buildMessage(msg);
      fieldsetElement?.appendChild(newElement);
    }

    this.removeLoadingIndicator();
    this.scrollToBottom();
  }

  /**
   * Build a param-element representing a message in the chat
   */
  public buildMessage(msg: Message): HTMLTableElement {
    let newElement = document.createElement('table');
    let newMsgName = document.createElement('td');
    let newMsgText = document.createElement('td');
    let newMsgDate = document.createElement('td');

    newElement.classList.add('chat-message');
    newMsgName.classList.add('chat-message-name');
    newMsgText.classList.add('chat-message-text');
    newMsgDate.classList.add('chat-message-date');

    newMsgName.innerText = msg.from + ":";
    newMsgText.innerText = msg.msg;
    newMsgDate.innerText = new Date(msg.time).toLocaleString("en-DE");

    newElement.appendChild(newMsgName);
    newElement.appendChild(newMsgText);
    newElement.appendChild(newMsgDate);

    return newElement;
  }

  /**
   * Insert a loading indicator
   */
  public insertLoadingIndicator(): void {
    var fieldsetElement = document.getElementById('chat');

    let newDotContainer = document.createElement('div');
    let newFlashingDots = document.createElement('div');

    newDotContainer.id = 'dot-container';
    newDotContainer.classList.add('dot-container');
    newFlashingDots.classList.add('dot-flashing');

    newDotContainer.appendChild(newFlashingDots);
    fieldsetElement?.appendChild(newDotContainer);
  }

  /**
   * Remove a loading indicator
   */
  public removeLoadingIndicator(): void {
    console.log('removing dots ...');
    var exists = this.dotContainer;
    if (exists != undefined && this.dotContainer) {
      this.dotContainer.remove();
    }
  }
}
