import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) { }
  result: any;

  // Actor Functions
  getActors() {
    return this.http.get("/actors");
  }

  getActorsWithMovies() {
    return this.http.get("/actors/movies");
  }

  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }

  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }

  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

  //Movie Functions 
  getMovies() {
    return this.http.get("/movies");
  }

  getMoviesWithActors() {
    return this.http.get("/movies/actors");
  }

  getMovie(id: string) {
    let url = "/movies/" + id;
    return this.http.get(url);
  }

  createMovie(data) {
    return this.http.post("/movies", data, httpOptions);
  }

  updateMovie(id, data) {
    let url = "/movies/" + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteMovie(id) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }

  deleteMoviesWithinYears(startYear, endYear) {
    let url = `/movies/${endYear}/${startYear}`;
    return this.http.delete(url, httpOptions);
  }

  addMovieToActor(actorId, data) {
    let url = `/actors/${actorId}/movies`;
    return this.http.post(url, data, httpOptions);
  }

  addActorToMovie(movieId, data) {
    let url = `/movies/${movieId}/actors`;
    return this.http.post(url, data, httpOptions);
  }

  removeMovieFromActor(actorId, movieId) {
    let url = `/actors/${actorId}/${movieId}`;
    return this.http.post(url, httpOptions);
  }

  removeActorFromMovie(movieId, actorId) {
    let url = `/movies/${movieId}/${actorId}`;
    return this.http.post(url, httpOptions);
  }
}