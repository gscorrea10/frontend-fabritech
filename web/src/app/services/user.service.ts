import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/user`, userObj);
  }
}
