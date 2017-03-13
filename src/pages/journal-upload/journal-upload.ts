import { HomePage } from './../home/home';
import { MediaService } from './../../providers/media-service';
import { UserService } from './../../providers/user-service';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, ToastController } from 'ionic-angular';
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
  private toast: any;
  private imageMIME: any = {
    'jpeg' : 'image/jpeg',
    'jpg'  : 'image/jpeg',
    'png'  : 'image/png'
  }
  private videoMIME: any = {
    'mp4' : 'video/mp4'
  }

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService, private userService: UserService) {}

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
                          //Update type for media got from ios
                          if (this.platform.is("ios")){
                              let mediaType = success.name.substring(success.name.lastIndexOf('.') + 1);
                              if (this.imageMIME[mediaType])
                                  success.type = this.imageMIME[mediaType]
                              else{
                                //Not support! Do sth
                                this.presentToast("File format not supported")
                                this.mediaSrc = '';
                                form.resetForm();
                                return
                              }
                          }
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
                                              const tag_owner = {
                                                  file_id: resp.file_id,
                                                  tag: "#travelust_myjournal_beta_" + this.userService.getUserFromLocal().user_id
                                              }
                                              console.log(tag_owner);
                                              this.mediaService.createFileTag(tag_owner).subscribe(
                                                  respTagOwner => {
                                                      console.log(respTagOwner)
                                                      this.mediaService.shouldReload = true;
                                                      // this.navCtrl.parent.select(0);
                                                      this.mediaSrc = '';
                                                      form.resetForm();
                                                  }
                                              )
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

  goToHomepage = () => {
    let loader = this.loadingCtrl.create({
      content: "Journal creating...",
      duration: 3000
    });
    loader.present();
    setTimeout(() => {
      this.navCtrl.parent.select(0);
    }, 3000);
  }

  openGallery = () => {
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI,
      mediaType: Camera.MediaType.PICTURE,
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

  presentToast = (msg: string) => {
    this.toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'top'
    });
    this.toast.present();
  }

}
