import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../shared/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class DeleteMyAccountService {
  private readonly httpClient = inject(HttpClient);
  deleteAccount(): Observable<any> {
    return this.httpClient.delete(
      `${environment.BASE_URL}/api/v1/auth/deleteMe`,
    );
  }
}
