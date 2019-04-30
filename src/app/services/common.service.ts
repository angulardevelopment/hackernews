import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, flatMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CommonService {

  private cacheFeed: string[];
  private cacheFeedSize: number;
  // constructor(private _api: Http) {}
  constructor(private _http:HttpClient){
  }

  
  getNews(){      
    return this._http.get(`https://hn.algolia.com/api/v1/search_by_date?query=nodejs&tags=story`).pipe(map(res=>{
        return res;
    }))
}

getFeed(feedType): Observable<any> {
  return this._http
    .get(`https://hacker-news.firebaseio.com/v0/${feedType}.json`)
    .pipe(map(data => data))
    .pipe(tap(data => ((this.cacheFeed = data), (this.cacheFeedSize = data.length))));
}

getFeedItem(itemId): Observable<any> {
  return this._http
    .get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
    .pipe(map(data => data));
}

getFeedItemInRange(feedType, startCount, endCount): Observable<any> {
  return this.getFeed(feedType)
    .pipe(map(data => data.slice(startCount - 1, Math.min(startCount + 29, this.cacheFeedSize))))
    .pipe(flatMap(data => from(data)))
    .pipe(flatMap(data => this.getFeedItem(data)))
    .pipe(
      map(data => ({
        item: data,
        feedCount: this.cacheFeedSize
      }))
    );
}

getUser(userId): Observable<any> {
  return this._http
    .get(`https://hacker-news.firebaseio.com/v0/user/${userId}.json`)
    .pipe(map(data => data));
}

getCommentTree(commentId): Observable<any> {
  return this._http
    .get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
    .pipe(map(data => data));
}

}




