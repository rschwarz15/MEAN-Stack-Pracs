import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];

  section = 1;

  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  title: string = "";
  year: number = 0;
  movieId: string = "";
  aYear: number = 0;
  
  constructor(private dbService: DatabaseService) { }

  //#region Actor Functions
  //Get all Actors
  onGetActors() {
    this.dbService.getActorsWithMovies().subscribe((data: any[]) => {
      // Get just the title of each movie
      data.forEach(element => {
        element.movies = element.movies.map(a => a.title)
      });

      this.actorsDB = data;
    });
  }
  
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
      this.section = 1; //redirect to listing
    });
  }

  // Update an Actor
  onSelectUpdateActor(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  //#endregion

  //#region Movie Functions

  //Get all Movies
  onGetMovies() {
    this.dbService.getMoviesWithActors().subscribe((data: any[]) => {
      // Get just the name of each actor
      data.forEach(element => {
        element.actors = element.actors.map(a => a.name)
      });
      this.moviesDB = data;
    });
  }

  //Create a new Movie, POST request
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
    this.section = 6; //redirect to listing
  }

  // Update an Movie
  onSelectUpdateMovie(item) {
    this.title = item.title;
    this.year = item.year;
    this.movieId = item._id;
  }

  onUpdateMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.updateMovie(this.movieId, obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movies before year
  onDeleteMoviesBeforeYear() {
    // aYear - 1 because the delete is inclusive of bounds
    this.dbService.deleteMoviesWithinYears(Number.MIN_SAFE_INTEGER, this.aYear-1).subscribe(result => {
      this.onGetMovies();
    });
  }

  // Add movie<->actor
  onAddMovieToActor() {
    let obj = { id: this.movieId };
    this.dbService.addMovieToActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  onAddActorToMovie() {
    let obj = { id: this.actorId };
    this.dbService.addActorToMovie(this.movieId, obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  // Add actor<->movie
  onRemoveMovieFromActor() {
    this.dbService.removeMovieFromActor(this.actorId, this.movieId).subscribe(result => {
      this.onGetActors();
    });
  }

  onRemoveActorFromMovie() {
    this.dbService.removeActorFromMovie(this.movieId, this.actorId).subscribe(result => {
      this.onGetMovies();
    });
  }

  //#endregion

  // This lifecycle callback function will be invoked when the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";

    this.title = "";
    this.year = 0;
    this.movieId = "";
  }
}