import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideosApiService {
  // tslint:disable-next-line:max-line-length
  _videosGoogleApi = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=50&type=video&part=snippet&q=john';

  constructor(private _http: HttpClient) { }

  public getVideos() {
    return this._http.get(this._videosGoogleApi);
  }
}
