import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-add-actor-movie',
  templateUrl: './add-actor-movie.component.html',
  styleUrls: ['./add-actor-movie.component.css']
})
export class AddActorMovieComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];

  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  title: string = "";
  year: number = 0;
  movieId: string = "";

  constructor(private dbService: DatabaseService) { }

  //Get Actors
  onGetActors() {
    this.dbService.getActorsWithMovies().subscribe((data: any[]) => {
      // Get just the title of each movie
      data.forEach(element => {
        element.movies = element.movies.map(a => a.title)
      });

      this.actorsDB = data;
    });
  }

  //Get Movies
  onGetMovies() {
    //Get Movies
    this.dbService.getMoviesWithActors().subscribe((data: any[]) => {
      // Get just the name of each actor
      data.forEach(element => {
        element.actors = element.actors.map(a => a.name)
      });

      this.moviesDB = data;
    });
  }

  // Select an Actor
  onSelectUpdateActor(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  // Select an Movie
  onSelectUpdateMovie(item) {
    this.title = item.title;
    this.year = item.year;
    this.movieId = item._id;
  }


  // Add movie->actor
  onAddMovieToActor() {
    let obj = { id: this.movieId };
    this.dbService.addMovieToActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  // Add actor->movie
  onAddActorToMovie() {
    let obj = { id: this.actorId };
    this.dbService.addActorToMovie(this.movieId, obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  // Remove actor from movie
  onRemoveMovieFromActor() {
    this.dbService.removeMovieFromActor(this.actorId, this.movieId).subscribe(result => {
      this.onGetActors();
    });
  }

  // Remove movie from actor
  onRemoveActorFromMovie() {
    this.dbService.removeActorFromMovie(this.movieId, this.actorId).subscribe(result => {
      this.onGetMovies();
    });
  }

  ngOnInit() {
    console.log("Hi From AddActorMovieComponent ngIOnit");

    this.onGetActors();
    this.onGetMovies();
  }
}
