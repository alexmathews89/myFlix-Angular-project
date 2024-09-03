import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  movies: any[] = [];
  FavoriteMovies: any[] = [];

  userInfo: any = localStorage.getItem('user');
  user: any = JSON.parse(this.userInfo);

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

  addFavorite(): void {
    this.fetchApiData.addFavoriteMovie();
  }

  openProfilePageDialog(): void {
    this.dialog.open(ProfilePageComponent, {
      width: '700px',
      height: '700px',
    });
  }

  openGenreDialog(Name: string, Description: string): void {
    //this.getMovies();

    this.dialog.open(GenreCardComponent, {
      data: { Name, Description },
      width: '600px',
      height: '200px',
    });
  }

  openDirectorDialog(Name: string, Birth: string): void {
    //this.getMovies();

    this.dialog.open(DirectorCardComponent, {
      data: { Name, Birth },
      width: '200px',
      height: '100px',
    });
  }

  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
