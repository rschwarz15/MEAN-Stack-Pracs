import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-listmovies",
  templateUrl: "./listmovies.component.html",
  styleUrls: ["./listmovies.component.css"],
})
export class ListmoviesComponent implements OnInit {
  moviesDB: any[] = [];

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    console.log("Hi From ListMovies ngIOnit");

    this.dbService.getMoviesWithActors().subscribe((data: any[]) => {
      // Get just the name of each actor
      data.forEach(element => {
        element.actors = element.actors.map(a => a.name)
      });

      this.moviesDB = data;
    });
  }
}