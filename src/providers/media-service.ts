import { LoginService } from './login-service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MediaService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MediaService {

  private url: string = 'http://media.mw.metropolia.fi/wbma';

  constructor(public http: Http, private loginService: LoginService) {
    console.log('Hello MediaService Provider');
  }

  getMedia = (start: any) => {
    return this.http.get(this.url + '/media?start=' + start + '&limit=10')
      .map(
        resp => resp.json()
      );
  }

  uploadMedia = (image: any) => {
    console.log(this.loginService.getUser().token);
    return this.http.post(this.url + '/media?token=' + this.loginService.getUser().token, image)
      .map(
        resp => resp.json()
      );
  }

}
