import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from "webstomp-client";

export default class WebSocketService {
  
  connected = false;
  socket = null;
  stompClient : any = null;

  constructor() {
    this.socket = new SockJS("http://localhost:8080/snack");
    this.stompClient = Stomp.over(this.socket);
  }

  connect(onConnected : any) {
    this.stompClient.connect({}, onConnected, (error : String) => {
      console.log(error);
      this.connected = false;
    });
  }
  
  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
    this.connected = false;
  }
  
  sendMessage(channel : String, message : Object) {
    if (this.stompClient && this.stompClient.connected) {
      console.log("sending message: ", message);
      this.stompClient.send(channel, JSON.stringify(message), {});
    }
  }

  subscribe(url : String, callback : Function) {
    this.stompClient.subscribe(url, callback);
  }
}