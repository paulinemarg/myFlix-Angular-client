import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})
export class MovieGenreComponent implements OnInit {

  genres: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
    }
  ) { }

  ngOnInit(): void {
    this.getGenreDescription();
  }

  getGenreDescription(): void {
    this.fetchApiData.getGenres().subscribe((response: any) => {
      this.genres = response;
      // console.log(this.genres);
      return this.genres;
    });
  }
}