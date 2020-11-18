import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DatabaseService } from "./database.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { RouterModule, Routes } from "@angular/router";

import { ListactorsComponent } from "./listactors/listactors.component";
import { AddactorComponent } from "./addactor/addactor.component";
import { DeleteactorComponent } from "./deleteactor/deleteactor.component";
import { UpdateactorComponent } from "./updateactor/updateactor.component";
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { UpdatemovieComponent } from './updatemovie/updatemovie.component';
import { AddActorMovieComponent } from './add-actor-movie/add-actor-movie.component';
import { ViewNotFoundComponent } from './view-not-found/view-not-found.component';
import { DeleteBothComponent } from './delete-both/delete-both.component';

const appRoutes: Routes = [
  { path: "listactors", component: ListactorsComponent },
  { path: "addactor", component: AddactorComponent },
  { path: "updateactor", component: UpdateactorComponent },
  { path: "deleteactor", component: DeleteactorComponent },
  { path: "listmovies", component: ListmoviesComponent },
  { path: "addmovie", component: AddmovieComponent },
  { path: "updatemovie", component: UpdatemovieComponent },
  { path: "deletemovie", component: DeletemovieComponent },
  { path: "addActorMovie", component: AddActorMovieComponent },
  { path: "viewNotFound", component: ViewNotFoundComponent },
  { path: "deleteBoth", component: DeleteBothComponent },
  { path: "", redirectTo: "/listactors", pathMatch: "full" },
  { path: "**", redirectTo: "/viewNotFound", pathMatch: "full" },
];

@NgModule({
  declarations: [
    AppComponent,
    ListactorsComponent,
    AddactorComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    ListmoviesComponent,
    AddmovieComponent,
    DeletemovieComponent,
    UpdatemovieComponent,
    AddActorMovieComponent,
    ViewNotFoundComponent,
    DeleteBothComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}),

    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule { }