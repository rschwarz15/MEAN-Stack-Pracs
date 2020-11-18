import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-updatemovie",
  templateUrl: "./updatemovie.component.html",
  styleUrls: ["./updatemovie.component.css"],
})
export class UpdatemovieComponent implements OnInit {
  title: string = "";
  year: number = 0;
  movieId: string = "";

  moviesDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}

  //Get all Movies
  onGetMovies() {
    console.log("From on GetMovies");

    return this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  // Update an Movie
  onSelectUpdate(item) {
    this.title = item.title;
    this.year = item.year;
    this.movieId = item._id;
  }
  onUpdateMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.updateMovie(this.movieId, obj).subscribe(result => {
      this.onGetMovies();
      this.router.navigate(["/listmovies"]);
    });
  }

  ngOnInit() {
    this.onGetMovies();
  }
}