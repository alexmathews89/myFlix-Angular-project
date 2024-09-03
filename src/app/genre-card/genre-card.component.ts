import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrl: './genre-card.component.scss',
})
export class GenreCardComponent {
  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) {}

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      //return this.movies;
    });
  }
}
