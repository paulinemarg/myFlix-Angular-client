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
      Name: string;
    }
  ) { }

  ngOnInit(): void {
    this.getDirectorBio();
  }

  getDirectorBio(): void {
    this.fetchApiData.getDirectors().subscribe((response: any) => {
      this.directors = response;
      return this.directors;
    });
  }
}
