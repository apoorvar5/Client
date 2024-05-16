import { Injectable, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit{
  private hubConnection: HubConnection;
  private messageReceivedSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5114/chatHub', {
        accessTokenFactory: () => localStorage.getItem('tokenKey') || '' // Retrieve token from localStorage
      })
      .build();

    this.startConnection();
    this.registerMessageHandler(); // Register message handler
  }

  ngOnInit(): void {
    this.startConnection();
    this.registerMessageHandler(); 
  }

  public async startConnection() {
    console.log('Start Function');
    try {
      await this.hubConnection.start();
      console.log('SignalR connection started successfully.');
    } catch (error) {
      console.error('Error starting SignalR connection:', error);
    }
  }

  public async sendMessage(message: string) {
    
    if (this.hubConnection.state === "Connected") {
      try {
        await this.hubConnection.send('SendMessage', message);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.error('SignalR connection is not in the "Connected" state.');
    }
  }

  public receiveMessage(): Observable<string> { // Define receiveMessage method
    return this.messageReceivedSubject.asObservable();
  }

  private registerMessageHandler() {
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      this.messageReceivedSubject.next(message);
    });
  }
}
