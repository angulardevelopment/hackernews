import { Component, OnInit } from '@angular/core';


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {



  ngOnInit() {
  }


  

    name = 'Angular';
     place: string;
    language: string;
    results: any = []; // This will hold the data coming from the service
    selected: boolean = false; // Flag to check if a user is clicked or not
    selectedUser: any; // presently Selected user details
    error_text: string = ""; // So called error reporing text to the end user
  
    search(place: string, language: string) {
      this.selected = false;
      this.error_text = "";
      if (place || language) {
        this.place = place;
        this.language = language;
        this.getUsersByPlaceAndLanguage(place, language).subscribe(
          users => {
            this.results = users['items'];
          },
          error => {
            console.error(error,'errorplaace');
            this.results = [];
            this.error_text = "Sorry! No Users found. Try again";
          }
        )
      }
    }
  
    getDetails(username: string) {
      this.getDetailsByUserName(username).subscribe(
        userDatils => {
          this.selectedUser = userDatils;
          this.selected = true;
        },
        error => {
          console.error(error,'errorname');
          this.selected = false;
        }
      )
    }
  
    
    private searchUsersEndPoint = "https://api.github.com/search/users?q=";
    private getUserDetailsEndPoint = "https://api.github.com/users/";
  
    constructor(private http: HttpClient) { }
  
    getUsersByPlaceAndLanguage(place: string, language: string) {
      let url;
      if (place && !language) {
        url = `${this.searchUsersEndPoint}location:${place}`;
      } else if (!place && language) {
        url = `${this.searchUsersEndPoint}language:${language}`;
      } else {
        url = `${this.searchUsersEndPoint}location:${place}+language:${language}`;
      }
      return this.http.get(url).pipe(map(res => {
        return res;
      }))
    }
  
    getDetailsByUserName(username: string) {
      if (username) {
        let url = `${this.getUserDetailsEndPoint}${username}`;
        return this.http.get(url).pipe(
          catchError(this.handleError)
        );
      }
    }
  
      private handleError (error: any) {
      // In a real world app, we might use a remote logging infrastructure
      // We'd also dig deeper into the error to get a better message
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error('err' + errMsg); // log to console instead
      return Observable.throw(errMsg);
      }
  
  
  
}
