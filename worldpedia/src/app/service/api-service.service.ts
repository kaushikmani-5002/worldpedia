import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
    
  }

  getCountries(): Observable<any>{
    return this.http.get("https://restcountries.com/v3.1/all");
  }

  searchCountry(name: string): Observable<any>{
    return this.http.get(`https://restcountries.com/v3.1/name/${name}`);
  }
}
