import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [FormsModule, NgFor],
  standalone: true,
})
export class ChatComponent implements OnInit {
messages: string[] = []; // Array to store messages
messageToSend: any;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    // Subscribe to messages
    this.chatService.receiveMessage().subscribe(message => {
      this.messages.push(message); // Add the received message to the array
    });
  }

  sendMessage(): void {
    if (this.messageToSend.trim() !== '') {
      this.chatService.sendMessage(this.messageToSend);
      this.messageToSend = '';
    }
  }
}
