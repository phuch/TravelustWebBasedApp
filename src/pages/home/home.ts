import { MediaService } from './../../providers/media-service';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailViewPage } from './../detail-view/detail-view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MediaService]
})
export class HomePage implements OnInit {

  private start: number = 0;
  private medias: any = [];

  url: string = 'http://media.mw.metropolia.fi/wbma/uploads/'
  constructor(public navCtrl: NavController, private mediaService: MediaService) {
  }

  ngOnInit () {
    this.getMedia();
  }

  getMedia = () =>{
    this.mediaService.getMedia(this.start).subscribe(
      resp => {
        for( let data of resp) {
          this.medias.push(data);
        }
        console.log(this.medias);
      }
    );
  }

  doInfinite (infiniteScroll: any) {
    console.log('start is currently' + this.start);

    setTimeout(() => {
      this.start += 10;
      this.getMedia();
      infiniteScroll.complete();
    }, 1000);

  }

  navigateToDetail = (fileId: any) => {
    this.navCtrl.push(DetailViewPage, {fileId: fileId});
  }

}
