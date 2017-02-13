import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {
  isLogged: boolean;
  private url: string = 'http://media.mw.metropolia.fi/wbma';
  private user: any = {}
  constructor(public http: Http) {
    console.log('Hello LoginService Provider');
  }

  setUser = (user) => {
    this.user = user;
  }

  getUser = () => {
    return this.user;
  }

  login = () => {
     this.http.post(this.url + '/login', this.user)
      .subscribe(
        resp => {
          const dataFromServer = resp.json();
          //save user data to local storage
          this.user = dataFromServer.user;
          this.user.token = dataFromServer.token;
          console.log(this.user);
          localStorage.setItem('user', JSON.stringify(this.user));
          this.isLogged = true;
        },
        //error handler
        err => {
          if(err._body.message == "Authentication failed due bad username" || err._body.message == "Authentication failed due bad password"){
            this.isLogged = false;
          }
        }
      ).unsubscribe();
      return this.isLogged;
  }

}
