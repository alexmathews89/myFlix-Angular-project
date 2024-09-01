import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { window } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openProfilePageDialog(): void {
    this.dialog.open(ProfilePageComponent, {
      width: '700px',
      height: '700px',
    });
  }

  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
