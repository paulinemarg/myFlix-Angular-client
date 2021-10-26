import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {
  directors: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string,
      bio: string,
      birthyear: Date,
      filmography: string,
      image: string
    }
  ) { }

  ngOnInit(): void {
    this.getDirector();
  }

  getDirector(): void {
    this.fetchApiData.getDirectors().subscribe((response: any) => {
      this.directors = response;
      // console.log(this.directors);
      return this.directors;
    });
  }
}