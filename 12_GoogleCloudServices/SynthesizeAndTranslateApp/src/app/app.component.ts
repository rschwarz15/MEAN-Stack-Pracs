import { Component } from '@angular/core';

import * as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket: SocketIOClient.Socket;
  socketId: string;

  text: string;
  translatedText: string;
  language: string = "en";
  accent: string = "en";
  gender: string = "NEUTRAL";

  constructor() {
    this.socket = io.connect();

    // remember the socketID
    this.socket.on('connect', function() {
      this.socketId = this.id;
      console.log("New connection made with ID=" + this.socketId);
    });
  }

  ngOnInit() {
    this.listenForTranslatedTextEvent();
    this.listenForAudioFileReadyEvent();
  }

  listenForTranslatedTextEvent() {
    this.socket.on("translatedTextEvent", data => {
      this.translatedText = data.translatedText;
    })
  }

  listenForAudioFileReadyEvent() {
    this.socket.on("audioFileReadyEvent", function () {
      // update audio source
      let audio = <HTMLAudioElement>document.getElementById("audio");
      audio.src = `${this.socketId}.mp3?tim=` + new Date().getTime();
      audio.load();
    })
  }

  changeLanguage(e) {
    this.language = e.target.value;
    this.accent = e.target.value;
  }

  changeGender(e) {
    this.gender = e.target.value;
  }

  onSubmitRequest() {
    this.socket.emit("translationAndSynthesisEvent", { text: this.text, language: this.language, accent: this.accent, gender: this.gender});
  }
}
