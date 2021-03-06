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
  favorites: any[] = [];
  genres: any[] = [];

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
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      return this.movies;
    });
  }
  /**
   * Opens the synopsis dialog
   * @param title 
   * @param imageUrl 
   * @param description 
   */
  openSynopsisDialog(title: string, description: string, releaseYear: string, rating: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { title, description, releaseYear, rating },
    })
  }

  /**
   * Opens the genre dialog
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Name: name,
      }
    });
  }

  /**
  * Opens the director dialog
  * @param name 
  * @param bio 
  * @param birthyear 
  * @param filmography 
  * @param image
  */
  openDirectorDialog(name: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        Name: name,
      }
    });
  }
  /**
   * Adds the movie with the assigned id to favorites
   * @param movieId 
   */
  addToFavorites(movieId: any,) {
    console.log(movieId);
    this.fetchApiData.addToFavorites(movieId).subscribe((resp: any) => {

      console.log(resp);
      this.snackBar.open(`The selected movie has been added to your favorites.`, 'OK', {
        duration: 3000,
      });
      this.getUserFavorites();
    });
  }

  /**
   * Removes the movie with the assigned id from favorites
   * @param movieId 
   */
  removeFromFavorites(id: string, Title: string): void {
    this.fetchApiData.removeFromFavorites(id).subscribe((resp: any) => {

      console.log(resp);
      this.snackBar.open(`The selected movie has been added to your favorites.`, 'OK', {
        duration: 3000,
      });
      this.getUserFavorites();
    });
  }
  /**
   * Gets the list of user favorite movies
   */
  getUserFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      return this.favorites;
    });
  }
  setFavoriteStatus(id: any): any {
    if (this.favorites.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
