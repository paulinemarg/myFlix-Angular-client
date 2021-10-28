import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://backend-myflix.herokuapp.com/';
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  // Making the api call for the user registration endpoint
  public userRegistration(userData: any): Observable<any> {
    // console.log(userData);
    return this.http.post(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userData: any): Observable<any> {
    // console.log(userData);
    return this.http.post(apiUrl + 'login', userData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occued: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later!'
    );
  }
  /**
   * Get all movies method
   * @returns an array of movies
   */
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer  ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
  * Get a movie
  * @returns a movie
  */
  getAMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/:movieId', {
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
     * Get one director
     * @returns a director
     */
  getADirector(): Observable<any> {
    return this.http.get(apiUrl + 'directors/:name', {
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
   * Get one genre
   * @returns a genre
   */
  getAGenre(): Observable<any> {
    return this.http.get(apiUrl + 'genres/:name', {
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
  * Get user by username
  * @param username - username
  * @returns Object - user data
  */
  getUser(username: any): Observable<any> {
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
   * Edit userData user by username
   * @param userData - username and password
   * @returns success/error message
   */
  editUser(userData: any): Observable<any> {
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, userData, {
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
    const username = localStorage.getItem('user');
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
     * Delete user
     * @param userData - username and password
     * @returns success/error message
     */
  deleteUser(): Observable<any> {
    const user = localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${user}`, {
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
     * @param username (Injected automatically, username extracted from login params)
     * @returns Array - favorite movies
     */
  getFavorites(): Observable<any> {
    const user = localStorage.getItem('username');
    return this.http.get(apiUrl + `users/${user}/movies`, {
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
   * @param id, username (Injected automatically, username extracted from login params)
   * @returns success/error message
   */
  addToFavorites(movieId: any): Observable<any> {
    const username = localStorage.getItem('user');
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
     * @param id, username (Injected automatically, username extracted from login params)
     * @returns success/error message
     */
  removeFromFavorites(movieid: any): Observable<any> {
    const username = localStorage.getItem('user');
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

  // non-typed response extraction
  private extractResponseData(res: any | object): any {
    const body = res;
    return body || {};
  }
}