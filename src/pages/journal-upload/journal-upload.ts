import { HomePage } from './../home/home';
import { MediaService } from './../../providers/media-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the JournalUpload page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-journal-upload',
  templateUrl: 'journal-upload.html',
  providers: [MediaService]
})
export class JournalUploadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalUploadPage');
  }

  uploadMedia = (event: any, value: any) => {
    const fileElement = event.target.querySelector('input[type=file]');
    const file = fileElement.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', value.title);
    formData.append('description', value.description);

    this.mediaService.uploadMedia(formData).subscribe(
      data => {
        console.log(data);
        this.navCtrl.push(HomePage);
      }
    )
  }





}
