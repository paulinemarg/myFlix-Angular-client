import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { Router } from '@angular/router';

const username = localStorage.getItem('user');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  /**
   * When opens the component,
   * gets the movies, user information,
   * and the list of favorite movies
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites();
    this.getUser(username);
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
   * Gets the user information
   * @param username 
   */
  getUser(username: any): void {
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }
  /**
   * Opens the synopsis dialog
   * @param title 
   * @param imageUrl 
   * @param description 
   */
  openSynopsisDialog(title: string, imageUrl: any, description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { title, imageUrl, description, },
      //width: '50%'
    })
  }

  /**
   * Opens the genre dialog
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description, },
    })
  }

  /**
   * Opens the director dialog
   * @param name 
   * @param bio 
   * @param birthyear 
   * @param filmography 
   * @param image
   */
  openDirectorDialog(name: string, bio: string, birthyear: Date, filmography: string, image: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birthyear, filmography, image },
    })
  }
  /**
   * Adds the movie with the assigned id to favorites
   * @param movieId 
   */
  addToFavorites(movieId: any,) {
    console.log(movieId);
    this.fetchApiData.addMovie(movieId).subscribe((resp: any) => {

      console.log(resp);
      this.snackBar.open(`The selected movie has been added to your favorites.`, 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
        window.location.reload()
      }, 3000);
      this.getUserFavorites();
    });
  }

  /**
   * Removes the movie with the assigned id from favorites
   * @param movieId 
   */
  removeFromFavorites(movieId: any,) {
    console.log(movieId);
    this.fetchApiData.deleteMovie(movieId).subscribe((resp: any) => {

      console.log(resp);
      this.snackBar.open(`The selected movie has been added to your favorites.`, 'OK', {
        duration: 3000,
      })

      setTimeout(function () {
        window.location.reload()
      }, 3000);
      this.getUserFavorites();
    });
  }
  /**
   * Gets the list of user favorite movies
   */
  getUserFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.favoriteMovies = res.FavoriteMovies;
      //console.log(this.faves);
      return this.favoriteMovies;
    });
  }
  /**
   * Checks wheather if the movie with the assigned id,
   * is already added to the favorites or not.
   * @param id 
   * @returns 
   */
  isFavorited(id: any): any {
    if (this.favoriteMovies.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
