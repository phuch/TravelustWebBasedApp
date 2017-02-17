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

<<<<<<< HEAD
  getUser = () => {
    console.log(this.user);
    return this.user;
  }

=======
>>>>>>> 86d3dc46d09fbc4da97b3a7315ad05808dfa329e
  login = () => {
     return this.http.post(this.url + '/login', this.user).map(res => res.json());
  }

  isLoggedIn(){
    return this.isLogged;
  }

  setLoggedIn(status: boolean){
    this.isLogged = status;
  }

  register = () => {
    return this.http.post(this.url + '/users', this.user)
      .map(resp => resp.json());
  }

}
