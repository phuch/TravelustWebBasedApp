import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Media provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Media {
  private url: string = 'http://media.mw.metropolia.fi/wbma';
  private user: any = {};

  constructor(public http: Http) {}

  setUser = (user) => {
    this.user = user;
  }

  login = () => {
    this.http.post(this.url + '/login', this.user)
      .subscribe(
        resp => {
          const dataFromServer = resp.json()
          //save user data to local storage
          this.user = dataFromServer.user;
          this.user.token = dataFromServer.token;
          console.log(this.user);
          localStorage.setItem('user', JSON.stringify(this.user));

        },
        //error handler
        err => {
          console.log(err);
        }
      );
  }

}
