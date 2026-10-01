import { environment } from './../../../shared/environment/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { question } from '../../../shared/endpoint';
import { userProfileData } from '../interface/profile-data';
import {
  UpdateAccount,
  UpdateAccountRequest,
} from '../interface/Update-account';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService {
  private readonly httpClient = inject(HttpClient);

  getProfileData(): Observable<userProfileData> {
    return this.httpClient.get<userProfileData>(
      `${environment.BASE_URL}${question.userProfile}`,
    );
  }
  updateProfile(data: UpdateAccountRequest): Observable<UpdateAccount> {
    return this.httpClient.patch<UpdateAccount>(
      `${environment.BASE_URL}${question.userProfile}`,
      data,
    );
  }

  deleteAccount(): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.BASE_URL}${question.deleteAccount}`,
    );
  }
}
