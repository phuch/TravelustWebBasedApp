import { EditJournalInfoPage } from './../../edit-journal-info/edit-journal-info';
import { JournalAddMediaPage } from './../../journal-add-media/journal-add-media';
import { TabsPage } from './../../tabs/tabs';
import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController, LoadingController,Tabs } from 'ionic-angular';
import { MediaService } from './../../../providers/media-service';
import { UserService } from './../../../providers/user-service';

/*
  Generated class for the Popover page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
  providers: [MediaService, UserService]
})
export class PopoverPage {
  private media: any;
  private onMyJournalDelete: any;
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, public viewCtrl: ViewController,public app: App, public navCtrl: NavController, public navParams: NavParams, public mediaService: MediaService) {}

  ionViewDidLoad() {
    this.media = this.navParams.get("media");
    this.onMyJournalDelete = this.navParams.get("onMyJournalDelete")
    console.log(this.media)
    console.log('ionViewDidLoad PopoverPage');
  }


  goToEditInfo = () => {
    this.app.getRootNav().push(EditJournalInfoPage, {media: this.media}).then(() => this.viewCtrl.dismiss());
  }

  goToAddPhoto = () => {
    this.app.getRootNav().push(JournalAddMediaPage, {media: this.media}).then(() => this.viewCtrl.dismiss());
  }

  deleteJournal = () => {
    let loader = this.loadingCtrl.create({
      content: "Journal deleting...",
    });
    loader.present();
    
    //this.app.getRootNav().pop().then(() => this.viewCtrl.dismiss())
    this.mediaService.deleteMedia(this.media.file_id)
    .subscribe(
      resp => {
        console.log(resp)
        this.mediaService.shouldReload = true;
        loader.dismiss();
        this.viewCtrl.dismiss().then(
          () => this.app.getRootNav().pop().then(
            () => {
              if (this.app.getRootNav().last().name == "TabsPage")
                  this.app.getRootNav().setRoot(TabsPage)
              else{
                if (this.onMyJournalDelete)
                    this.onMyJournalDelete(this.media)
              }
            }
          )
        )
      }
    )
  }

  showConfirm() {
    this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: 'Delete this journal?',
      message: 'Are you sure to delete this journal?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteJournal();
          }
        }
      ]
    });
    confirm.present();
  }

}
