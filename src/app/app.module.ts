import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Adds the modules from the Material components
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieSynopsisComponent } from './movie-synopsis/movie-synopsis.component';
import { MovieGenreComponent } from './movie-genre/movie-genre.component';
import { GenresComponent } from './genres/genres.component';
import { MovieDirectorComponent } from './movie-director/movie-director.component';
import { DirectorsComponent } from './directors/directors.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { AuthGuardService } from './auth-guard.service';

// Welcome page is accessible when the user is not logged in.
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent, canActivate: [AuthGuardService] },
  { path: 'movies', component: MovieCardComponent },
  { path: 'directors', component: DirectorsComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];


@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    MovieSynopsisComponent,
    MovieGenreComponent,
    GenresComponent,
    MovieDirectorComponent,
    DirectorsComponent,
    NavbarComponent,
    EditUserProfileComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
