import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { VaultManagementApi } from 'src/api/vault-management-api';
import { UserInfoResponse } from 'src/models/user-info-response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<UserInfoResponse> {
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<UserInfoResponse>(VaultManagementApi.SIGNIN, body, { headers, withCredentials: true });
  }

}
