import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://backend-myflix.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  constructor(private http: HttpClient) {
  }
  /**
   * Making an api call for the user registration endpoint
   * @param userDetails 
   * @returns status message: success or error
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  /**
   * Making an api call for the user login endpoint
   * @param userDetails 
   * @returns status message: success or error
   */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Making an API call to get the list of all movies
   * @returns a list of movies
   */
  // Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
    * Make an API call to get information about a specific movie
    * @param title 
    * @returns Object including data about a specific movie
  */
  getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/:title`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get all directors method
   * @returns array of directors
   */
  getDirectors(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * Makes an API call to get information about a specific director
    * @param name 
    * @returns Object including data about a specific director
  */
  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/:name`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get all genres
   * @returns an array of genres
   */
  getGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes an API call to get information about a specific genre
   * @param genre 
   * @returns Object including data about a specific genre
   */
  getGenre(genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genres/:name`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Makes an API call to get information about a user
   * @param username 
   * @returns Object consists of information about a user
   */
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Makes an API call to get the list of favorite movies
   * @param username 
   * @returns a list (array) of favorite movies
   */
  getFavoriteMovies(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}/movies`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Makes an API call to add a movie the list of favorite movies
   * @param movieId 
   * @returns status message: success or error
   */
  addMovie(movieId: any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log(apiUrl + `users/${username}/movies/${movieId}`);
    return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, {},
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Make an APi call to edit the user information
   * @param userDetails 
   * @returns status message: success or error
   */
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.put(apiUrl + `users/${username}`, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Makes an API call to delete the account of a user
   * @returns status message: success or error
   */
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Makes an APi call to delete a movie from the favorite movies
   * @param movieid 
   * @returns status message: success or error
   */
  deleteMovie(movieid: any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieid}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }



  /**
   * Non-typed response extraction
   * @param res 
   * @returns body of response
   */
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
   * 
   * @param error 
   * @returns status of an error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        'Error body is:' + JSON.stringify(error.error));
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}