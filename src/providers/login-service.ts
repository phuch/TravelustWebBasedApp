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
  private isLogged: boolean;
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
     return this.http.post(this.url + '/login', this.user).map(res => res.json())
  }

  isLoggedIn(){
    return this.isLogged;
  }

  setLoggedIn(status: boolean){
    this.isLogged = status;
  }

}
