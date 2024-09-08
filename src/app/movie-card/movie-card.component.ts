import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { window } from 'rxjs';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';

/**
 * This is the main view component which genreates the movie cards and defines the
 * functions to add and remove a movie from the user's list of favorites as well
 * as opening the dialogs for a user's profile and a movies genres and directors
 */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  movies: any[] = [];
  FavoriteMoviesIds: any[] = [];

  userInfo: any = localStorage.getItem('user');
  user: any = JSON.parse(this.userInfo);

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoritesIds();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoritesIds(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.FavoriteMoviesIds = user.FavoriteMovies;
  }

  getFavoriteMovies(): any[] {
    return this.movies.filter((movie) =>
      this.FavoriteMoviesIds.includes(movie._id)
    );
  }

  isFavoriteMovie(movieID: string): boolean {
    return this.FavoriteMoviesIds.includes(movieID);
  }

  addFavoriteMovie(movieID: string): void {
    this.fetchApiData.addFavoriteMovie(movieID).subscribe((res: any) => {
      this.snackbar.open('Added to favorites.', 'OK', {
        duration: 3000,
      });
      localStorage.setItem('user', JSON.stringify(res));
      this.getFavoritesIds();
    });
  }

  removeFavoriteMovie(movieID: string): void {
    this.fetchApiData
      .deleteMovieFromFavorites(movieID)
      .subscribe((res: any) => {
        this.snackbar.open('Removed from favorites.', 'OK', {
          duration: 3000,
        });
        localStorage.setItem('user', JSON.stringify(res));
        this.getFavoritesIds();
      });
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
