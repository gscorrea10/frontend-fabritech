import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientModel } from '../model/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl: string = 'http://localhost:3333';
  token = localStorage.getItem('token');
  headerObj = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  httpOptions = {
    headers: this.headerObj,
  };

  constructor(private http: HttpClient) { }

  createClient(data: any) {
    return this.http.post<any>(
      `${this.baseUrl}/client`,
      data,
      this.httpOptions
    );
  }

  getAllClients() {
    return this.http.get(`${this.baseUrl}/client/all`, this.httpOptions);
  }

  deleteClient(id: string) {
    return this.http.delete<any>(
      `${this.baseUrl}/client/` + id,
      this.httpOptions
    );
  }

  updateClient(data: any, id: string) {
    return this.http.patch<any>(
      `${this.baseUrl}/client/update/` + id,
      data,
      this.httpOptions
    );
  }

}
