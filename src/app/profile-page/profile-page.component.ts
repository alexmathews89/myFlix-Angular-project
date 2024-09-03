import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

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
