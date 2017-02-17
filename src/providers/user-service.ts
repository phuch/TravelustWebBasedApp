import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {
  //Base url
  private url: string = 'http://media.mw.metropolia.fi/wbma';

  constructor(public http: Http) {
    console.log('Hello UserService Provider');
  }

  getUserFromLocal(){
    return JSON.parse(localStorage.getItem("user"));
  }
  
  //Get info of a user based on user id
  getUserInfo = (userId: any) => {
     const headers = new Headers({'x-access-token': this.getUserFromLocal().token})
     const options = new RequestOptions({headers : headers})
      return this.http.get(this.url + '/users/' + userId, options)
      .map(
        res =>
          res.json()
      );
  }

}
