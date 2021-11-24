import { Component, OnInit } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { exists } from 'fs';
import { url } from 'inspector';
import { BackendService } from 'src/app/services/backend.service';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, AfterViewChecked {
    // DIV für Nachrichten (s. Template) als Kind-Element für Aufrufe (s. scrollToBottom()) nutzen
    @ViewChild('messagesDiv') private myScrollContainer: ElementRef;

    // Access chat username from context
    // public chatUsername = console.log(this.context.currentChatUsername)

     public constructor( private router: Router,
        private backendService: BackendService
        // For usage of the context service
        // private context: ContextService
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
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { 
        }                 
    }

    public ngOnInit(): void {
        this.scrollToBottom();

    }

    /***
     * Copied
     */
     messagesDisplayed: number = 0;
     messagesOnServer: Array<string> = [];
     
     /**
      * Update every second to check if new messages available
      * --> Function not called explicitly, but continously every 1 second
      */
     window.setInterval(function () {
         this.recieveMessages();
         if (this.messagesOnServer.length > this.messagesDisplayed) {
             this.appendMessages(this.messagesOnServer.slice(this.messagesDisplayed));
         }
     }, 1000);
     
     /**
      * Send new message to the server
      * --> Function used in HTML files
      */
     public sendMessage():void {
         let url = window.chatServer + window.chatCollectionId + "/message";
         let messageText = { to: "Tom", message: document.getElementById("message").value };
         let messageJson = JSON.stringify(messageText);
     
         var xmlhttp = new XMLHttpRequest();
         xmlhttp.open("POST", url, false);
         xmlhttp.setRequestHeader("Content-type", "application/json");
         xmlhttp.setRequestHeader("Authorization", "Bearer " + window.authToken);
         xmlhttp.send(messageJson);
     
         document.getElementById("message").value = "";
         this.insertLoadingIndicator();
         this.scrollToBottom();
         return false;
     }
     
     /**
      * Retrieve messages from the server
      */
     public recieveMessages() :void{
         let url = window.chatServer + window.chatCollectionId + "/message/Tom";
         var xmlhttp = new XMLHttpRequest();
         xmlhttp.onreadystatechange = function () {
             if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                 messagesOnServer = JSON.parse(xmlhttp.responseText);
             }
         };
     
         xmlhttp.open("GET", url, true);
         xmlhttp.setRequestHeader("Authorization", "Bearer " + window.authToken);
         xmlhttp.send();
     }
     
     /**
      * Create new message elements in chat if not yet displayed
      */
     public appendMessages(messagesToAppend) :void{
         var fieldsetElement = document.getElementById("chat");
         messagesToAppend.forEach((msg) => {
             newElement = this.buildMessage(msg["from"], msg["msg"], msg["time"]);
             fieldsetElement?.appendChild(newElement);
             this.messagesDisplayed++;
         });
     
         this.removeLoadingIndicator();
         this.scrollToBottom();
     }
     
     /**
      * Build a param-element representing a message in the chat
      */
     public buildMessage(msgFrom:string, msgText:string, msgDate:Date):HTMLTableElement {
         let newElement = document.createElement("table");
         let newMsgName = document.createElement("td");
         let newMsgText = document.createElement("td");
         let newMsgDate = document.createElement("td");
     
         newElement.classList.add("chat-message");
         newMsgName.classList.add("chat-message-name");
         newMsgText.classList.add("chat-message-text");
         newMsgDate.classList.add("chat-message-date");
     
         newMsgName.innerText = msgFrom + ":";
         newMsgText.innerText = msgText;
         newMsgDate.innerText = new Date(msgDate).toLocaleString("en-DE");
     
         newElement.appendChild(newMsgName);
         newElement.appendChild(newMsgText);
         newElement.appendChild(newMsgDate);
     
         return newElement;
     }
     
     /**
      * Insert a loading indicator
      */
     public insertLoadingIndicator() :void{
         var fieldsetElement = document.getElementById("chat");
     
         let newDotContainer = document.createElement("div");
         let newFlashingDots = document.createElement("div");
     
         newDotContainer.id = "dot-container";
         newDotContainer.classList.add("dot-container");
         newFlashingDots.classList.add("dot-flashing");
     
         newDotContainer.appendChild(newFlashingDots);
         fieldsetElement?.appendChild(newDotContainer);
     }
     
     /**
      * Remove a loading indicator
      */
     public removeLoadingIndicator() :void{
         console.log("removing dots ...");
         var exists = document.getElementById("dot-container");
         if (exists != undefined) {
             document.getElementById("dot-container").remove();
         }
     }

}
