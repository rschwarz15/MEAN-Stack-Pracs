import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  section = 1;
  
  toggleSection() {
    this.section = this.section % 2 + 1 // makes 1->2 and 2->1
  }
}
