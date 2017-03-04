import { HomePage } from './../home/home';
import { MediaService } from './../../providers/media-service';
import { UserService } from './../../providers/user-service';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Camera } from 'ionic-native';

/*
  Generated class for the JournalUpload page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var window: any;
@Component({
  selector: 'page-journal-upload',
  templateUrl: 'journal-upload.html',
  providers: [MediaService, UserService]
})
export class JournalUploadPage {
  private mediaSrc: string;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService, private userService: UserService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalUploadPage');
  }

  uploadMedia = (form: any) => {
    let value = form.value;
    //Check platform to get the correct file path
    if (this.platform.is("android"))
        this.mediaSrc = "file://" + this.mediaSrc;
    window.resolveLocalFileSystemURL(this.mediaSrc,
    fileEntry => {
      console.log(fileEntry);
      fileEntry.file(
          success => {
                          var reader = new FileReader();

                          reader.onload = (e: any) => {
                              var imgBlob = new Blob([ e.target.result ], { type: success.type } );
                              const formData = new FormData();
                              formData.append('file', imgBlob);
                              formData.append('title', value.title);
                              formData.append('description', value.description);

                              this.mediaService.uploadMedia(formData).subscribe(
                                  resp => {
                                      console.log(resp);
                                      const tag = {
                                          file_id: resp.file_id,
                                          tag: "#travelust_journal_beta_" + resp.file_id
                                      }
                                      this.mediaService.createFileTag(tag).subscribe(
                                          respTag => {
                                              console.log(respTag)
                                              this.navCtrl.parent.select(0);
                                              this.mediaSrc = '';
                                              form.resetForm();
                                          },
                                          errTag => console.log("Create tag error: " + errTag)
                                      )
                                  },
                                  err => console.log("Upload media error: " + err)
                              )
                          };
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
          .then(file_uri => {
            this.mediaSrc = file_uri
          },
                err => console.log(err));
  }

}
