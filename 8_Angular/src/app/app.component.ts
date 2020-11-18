import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lab8';

  db = [];

  maker = "";
  model = "";
  bodyType = "";
  year = 0;
  address = "";
  state = "";
  postCode = "";

  makerToDelete = "";

  addCar() {
    // Check the values satisfy requirements


    this.db.push({
      id: uuidv4(),
      maker: this.maker,
      model: this.model,
      bodyType: this.bodyType,
      year: this.year,
      address: this.address,
      state: this.state,
      postCode: this.postCode
    });
  }

  deleteCarByID(id) {
    for (let i = 0; i < this.db.length; i++) {
      if (this.db[i].id == id) {
        this.db.splice(i, 1);
      }
    }
  }

  getOldCarCount() {
    let counter = 0;

    for (let i = 0; i < this.db.length; i++) {
      if (this.db[i].year < 2000) {
        counter++;
      }
    }

    return counter
  }

  deleteOldCars() {
    let i = 0;
    while(i < this.db.length) {
      if (this.db[i].year < 2000) {
        this.db.splice(i, 1);
      } else i++;
    }
  }

  deleteCarsByMaker() {
    let i = 0;
    while(i < this.db.length) {
      if (this.db[i].maker == this.makerToDelete) {
        this.db.splice(i, 1);
      } else i++;
    }
  }
}
