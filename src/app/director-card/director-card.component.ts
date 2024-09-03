import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrl: './director-card.component.scss',
})
export class DirectorCardComponent {
  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) {}

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}
