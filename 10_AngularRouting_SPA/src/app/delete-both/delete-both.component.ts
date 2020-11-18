import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-delete-both',
  templateUrl: './delete-both.component.html',
  styleUrls: ['./delete-both.component.css']
})
export class DeleteBothComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }
  //Get all Actors
  onGetActors() {
    console.log("From on GetActors");

    return this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  //Get all Movies
  onGetMovies() {
    console.log("From on GetMovies");

    return this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  // This callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }
}