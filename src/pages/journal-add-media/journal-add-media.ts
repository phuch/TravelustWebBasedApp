import { MediaService } from './../../providers/media-service';
import { UserService } from './../../providers/user-service';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, ToastController } from 'ionic-angular';
import { Camera } from 'ionic-native';

/*
  Generated class for the JournalAddMedia page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var window: any;
@Component({
  selector: 'page-journal-add-media',
  templateUrl: 'journal-add-media.html',
  providers: [MediaService, UserService]
})
export class JournalAddMediaPage {
  private mediaSrc: string;
  private media: any;
  private toast: any;
  private imageMIME: any = {
    'jpeg' : 'image/jpeg',
    'jpg'  : 'image/jpeg',
    'png'  : 'image/png'
  }
  private videoMIME: any = {
    'mp4' : 'video/mp4',
    'mov' : 'video/quicktime',
    'MOV' : 'video/quicktime'
  }

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController,public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService, private userService: UserService) {}

  ionViewDidLoad() {
    this.media = this.navParams.get("media");
    console.log('ionViewDidLoad JournalAddMediaPage');
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
                              else if (this.videoMIME[mediaType]){
                                  success.type = this.videoMIME[mediaType]
                              }
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

                              let loader = this.loadingCtrl.create({
                                content: "Photo uploading...",
                              });

                              loader.present();

                              this.mediaService.uploadMedia(formData).subscribe(
                                  resp => {
                                      loader.dismiss();
                                      console.log(resp);
                                      const tag = {
                                          file_id: resp.file_id,
                                          tag: "#travelust_subjournal_beta_" + this.media.file_id
                                      }
                                      this.mediaService.createFileTag(tag).subscribe(
                                          respTag => {
                                              console.log(respTag)
                                              this.navCtrl.pop();
                                              this.mediaSrc = '';
                                              form.resetForm();
                                          },
                                          errTag => console.log("Create tag error: " + errTag)
                                      )
                                  },
                                  err => {
                                    console.log("Upload media error: " + err)
                                    this.presentToast("Upload failed. Note: Video must be less than 50MB")
                                  }
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

  presentToast = (msg: string) => {
    this.toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });
    this.toast.present();
  }

}
