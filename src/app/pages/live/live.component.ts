// chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  chatId = 'defaultChatId'; // This should be dynamically set based on the chat context

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getMessages(this.chatId).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage(this.chatId, this.newMessage);
      this.newMessage = ''; // Clear message input after attempt to send
    }
  }
  
}
