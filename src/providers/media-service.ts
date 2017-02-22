import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from "@angular/http";
import { UserService } from './user-service';
import 'rxjs/add/operator/map';

/*
  Generated class for the MediaService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MediaService {
  //base url
  private url: string = 'http://media.mw.metropolia.fi/wbma';

  constructor(public http: Http, private userService: UserService) {
    console.log('Hello MediaService Provider');
  }

  //Get number of media files providing a starting number
  getMedia = (start: any) => {
    return this.http.get(this.url + '/media?start=' + start + '&limit=10')
      .map(
        resp => resp.json()
      );
  }


  uploadMedia = (image: any) => {
    const headers = new Headers({'x-access-token': this.userService.getUserFromLocal().token})
    const options = new RequestOptions({headers : headers})
    return this.http.post(this.url + '/media', image, options)
      .map(
        resp => resp.json()
        )
  }

  //Get a single media file based on file id
  getSingleMedia = (fileId: any) => {
    return this.http.get(this.url + '/media/' + fileId)
    .map(
      res =>
        res.json()
    );
  }

  //Get all favourites of a file based on file id
  getFileFavorite = (fileId: any) => {
      return this.http.get(this.url + '/favourites/file/' + fileId)
      .map(
        res =>
          res.json()
      );
  }

  //Create a favourite for a file based on file id
  createFileFavourite = (fileId: any) => {
      const headers = new Headers({'x-access-token': this.userService.getUserFromLocal().token})
      const options = new RequestOptions({headers : headers})
      const body = {file_id: fileId}
      return this.http.post(this.url + '/favourites', body, options)
      .map(
        res =>
          res.json()
      );
  }

  //Delete a favourite from a file based on file id
  deleteFileFavourite = (fileId: any) => {
      const headers = new Headers({'x-access-token': this.userService.getUserFromLocal().token})
      const options = new RequestOptions({headers : headers})
      return this.http.delete(this.url + '/favourites/file/' + fileId, options)
      .map(
        res =>
          res.json()
      );
  }

}
