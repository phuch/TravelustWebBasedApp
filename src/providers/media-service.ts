import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MediaService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MediaService {

  private url: string = 'http://media.mw.metropolia.fi/wbma';


  constructor(public http: Http) {
    console.log('Hello MediaService Provider');
  }

  getMedia = (start: any) => {
    return this.http.get(this.url + '/media?start=' + start + '&limit=10')
      .map(
        resp => resp.json()
      );
  }



}
