import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getFeature() {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-12-01&primary_release_date.lte=2019-12-31&api_key=51f34c996bfdcf867c5b95ad5ba21195&language=es&include_image_language=es`);
  }
}
