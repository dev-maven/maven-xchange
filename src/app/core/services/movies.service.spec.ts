/* tslint:disable:no-unused-variable */

import { getTestBed, TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  NOWPLAYINGMOVIES,
  SEARCHEDMOVIES,
  TOPRATEDMOVIES,
  TRENDINGMOVIES,
} from '../test-data/movies';

describe('Service: MovieService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://api.themoviedb.org/3';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve now playing movies ', () => {
    const service: MoviesService = TestBed.get(MoviesService);
    let movies: any;
    service.getNowPlayingMovies().subscribe((res) => (movies = res));

    const req = httpMock.expectOne(`${baseUrl}/movie/now_playing`);

    expect(req.request.method).toEqual('GET');
    req.flush(NOWPLAYINGMOVIES);

    expect(movies).toBeTruthy();
    expect(movies).toEqual(NOWPLAYINGMOVIES);
    expect(movies.results.length).toBe(20);
    const movie = movies.results.find((movie: any) => movie.id == 436270);
    expect(movie?.title).toBe('Black Adam');
  });

  it('should retrieve trending movies ', () => {
    const service: MoviesService = TestBed.get(MoviesService);
    let movies: any;
    service.getTrendingMovies().subscribe((res) => (movies = res));

    const req = httpMock.expectOne(`${baseUrl}/movie/popular`);

    expect(req.request.method).toEqual('GET');
    req.flush(TRENDINGMOVIES);

    expect(movies).toBeTruthy();
    expect(movies).toEqual(TRENDINGMOVIES);
    expect(movies.results.length).toBe(20);
    const movie = movies.results.find((movie: any) => movie.id == 966220);
    expect(movie?.title).toBe('Sniper: The White Raven');
  });

  it('should retrieve top rated movies ', () => {
    const service: MoviesService = TestBed.get(MoviesService);
    let movies: any;
    service.getTopRatedMovies().subscribe((res) => (movies = res));

    const req = httpMock.expectOne(`${baseUrl}/movie/top_rated`);

    expect(req.request.method).toEqual('GET');
    req.flush(TOPRATEDMOVIES);

    expect(movies).toBeTruthy();
    expect(movies).toEqual(TOPRATEDMOVIES);
    expect(movies.results.length).toBe(20);
    const movie = movies.results.find((movie: any) => movie.id == 278);
    expect(movie?.title).toBe('The Shawshank Redemption');
  });

  it('should retrieve movie by id ', () => {
    const service: MoviesService = TestBed.get(MoviesService);
    let movie: any;
    service.getMovieDetail('436270').subscribe((res) => (movie = res));

    const req = httpMock.expectOne(`${baseUrl}/movie/436270`);

    expect(req.request.method).toEqual('GET');
    req.flush(NOWPLAYINGMOVIES.results[0]);

    expect(movie).toBeTruthy();
    expect(movie).toEqual(NOWPLAYINGMOVIES.results[0]);
    expect(movie.title).toBe('Black Adam');
    expect(movie.id).toBe(436270);
  });

  it('should retrieve movies matching Black query', () => {
    const service: MoviesService = TestBed.get(MoviesService);
    let movies: any;
    service.searchMovies('black').subscribe((res) => (movies = res));

    const req = httpMock.expectOne(`${baseUrl}/search/movie?query=black`);

    expect(req.request.method).toEqual('GET');
    req.flush(SEARCHEDMOVIES);

    expect(movies).toBeTruthy();
    expect(movies).toEqual(SEARCHEDMOVIES);
    expect(movies.results.length).toBe(20);
    const movie = movies.results.find((movie: any) => movie.id == 505642);
    expect(movie?.title).toBe('Black Panther: Wakanda Forever');
  });
});
