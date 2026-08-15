import { environment } from './../../../shared/environment/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProfileData } from '../interface/profile-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService {
  private readonly httpClient = inject(HttpClient);

  getProfileData(): Observable<ProfileData> {
    return this.httpClient.get<ProfileData>(
      `${environment.BASE_URL}/api/v1/auth/profileData`,
    );
  }
}
