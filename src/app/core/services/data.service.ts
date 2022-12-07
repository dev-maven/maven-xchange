import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConvertedCurrency } from '../models/converted-currency';
import { ConversionForm } from '../models/conversion-form';

@Injectable()
export class DataService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  convertCurrency(formData: ConversionForm): Observable<ConvertedCurrency> {
    return this.http.get<ConvertedCurrency>(
      `${this.baseUrl}currency_data/convert?to=${formData.to}&from=${formData.from}&amount=${formData.amount}`
    );
  }

  convertCurrencies(source: string, currencies: string[]): Observable<any> {
    return this.http.get<any>(
      `${
        this.baseUrl
      }currency_data/live?source=${source}&currencies=${currencies.toString()}`
    );
  }

  getTrendingMovies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/popular`);
  }

  getTopRatedMovies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/top_rated`);
  }

  getany(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${id}`);
  }

  searchMovies(queryString: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search/movie`, {
      params: { query: queryString },
    });
  }
}
