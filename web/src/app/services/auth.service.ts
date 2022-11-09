import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  private baseUrl: string = 'http://localhost:3333';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this._isLoggedIn$.next(!!token);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, loginObj).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem('token', response.token);
        console.log(response.token);
      })
    );
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }
}
