import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * This component generates the dialog for a user to updated their
 * profile
 */

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  userInfo: any = localStorage.getItem('user');
  user: any = JSON.parse(this.userInfo);

  @Input() userData = { Username: '', Password: '', Email: '' };

  constructor(public fetchApiData: FetchApiDataService) {}

  /**
   * The update user function below is called when the user clicks the Update
   * button located on the dialog.  It then calls the the edit user function which
   * processes their update with the API endpoint
   */

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((resp: any) => {
      this.userData = resp;
      localStorage.setItem('user', JSON.stringify(resp));
      this.user.Username = resp.Username;
      this.user.Password = resp.Password;
      this.user.Email = resp.Email;

      return this.userData;
    });
  }
}
