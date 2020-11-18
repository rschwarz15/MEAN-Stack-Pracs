import { Component } from "@angular/core";
import * as io from "socket.io-client";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
})
export class AppComponent {
	messageText: string;
	messages: Array<any> = [];
	socket: SocketIOClient.Socket;
	
	constructor() {
		this.socket = io.connect();
	}

	ngOnInit() {
		this.messages = new Array();
		this.listen2Events();
	}

	listen2Events() {
		this.socket.on("msg", data => {
			this.messages.push(data);
		});
	}

	sendMessage() {
		this.socket.emit("newMsg", this.messageText);
		this.messageText = "";
	}
}