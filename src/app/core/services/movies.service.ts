import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MoviesService {
  baseUrl = 'https://api.themoviedb.org/3';
  constructor(private http: HttpClient) {}

  getNowPlayingMovies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/now_playing`);
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
