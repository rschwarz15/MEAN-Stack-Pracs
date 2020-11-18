import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-listactors",
  templateUrl: "./listactors.component.html",
  styleUrls: ["./listactors.component.css"],
})
export class ListactorsComponent implements OnInit {
  actorsDB: any[] = [];

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    console.log("Hi From ListActors ngIOnit");

    this.dbService.getActorsWithMovies().subscribe((data: any[]) => {
      // Get just the title of each movie
      data.forEach(element => {
        element.movies = element.movies.map(a => a.title)
      });

      this.actorsDB = data;
    });
  }
}