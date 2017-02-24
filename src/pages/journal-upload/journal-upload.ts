import { HomePage } from './../home/home';
import { MediaService } from './../../providers/media-service';
import { UserService } from './../../providers/user-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, File } from 'ionic-native';

/*
  Generated class for the JournalUpload page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var cordova: any;
declare var window: any;
@Component({
  selector: 'page-journal-upload',
  templateUrl: 'journal-upload.html',
  providers: [MediaService, UserService]
})
export class JournalUploadPage {
  private imageSrc: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService, private userService: UserService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalUploadPage');
  }

  uploadMedia = (value: any) => {
    window.resolveLocalFileSystemURL("file://" + this.imageSrc,
    fileEntry => {
      console.log(fileEntry);
      fileEntry.file(
          success => {
                          console.log(success);
                          var reader = new FileReader();
                          reader.onloadend = (e: any) => {
                              console.log(e.target.result);
                              var imgBlob = new Blob([ e.target.result ], { type: success.type } );
                              console.log(imgBlob)
                              const formData = new FormData();
                              formData.append('file', imgBlob);
                              formData.append('title', value.title);
                              formData.append('description', value.description);

                              this.mediaService.uploadMedia(formData).subscribe(
                                data => {
                                  console.log(data);
                                  this.navCtrl.push(HomePage);
                                }
                              )
                          }
                          reader.readAsArrayBuffer(success);
                      },
          err => console.log("get file "+ err))
        },
        err => console.log(err))
  }

  openGallery = () => {
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI,
      mediaType: Camera.MediaType.ALLMEDIA,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000
    }
    Camera.getPicture(cameraOptions)
          .then(file_uri => this.imageSrc = file_uri,
                err => console.log(err));
  }

}
