import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViaCepService {
  constructor(private http: HttpClient) {}

  findCep(cep: string) {
    cep = cep.replace(/\D/g, '');
    if (cep != '') {
      const cepValidator = /^[0-9]{8}$/;
      if (cepValidator.test(cep)) {
        console.log(cepValidator)
        return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
      }
    }
    return of({});
  }
}
