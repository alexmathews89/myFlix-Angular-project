import { Component } from '@angular/core';
//import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
//import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
//import { MovieCardComponent } from './movie-card/movie-card.component';
//import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'myFlix-Angular-project';

  /**  constructor(public dialog: MatDialog) {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
      height: '1000px',
    });
  }
    */
}
