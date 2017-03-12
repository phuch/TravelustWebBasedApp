import { UserService } from './../../../providers/user-service';
import { MediaService } from './../../../providers/media-service';
import { EditJournalInfoPage } from './../../edit-journal-info/edit-journal-info';
import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the PopoverDetailView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-popover-detail-view',
  templateUrl: 'popover-detail-view.html',
  providers: [MediaService, UserService]
})
export class PopoverDetailViewPage {

  private file: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public viewCtrl: ViewController, public mediaService: MediaService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverDetailViewPage');
    this.file = this.navParams.get("file");
    console.log(this.file)
  }

  goToEditInfo = () => {
    this.navCtrl.push(EditJournalInfoPage, {media: this.file}).then(() => this.viewCtrl.dismiss());
  }

  deleteMedia = () => {
    this.mediaService.deleteMedia(this.file.file_id)
    .subscribe(
      resp => {
        console.log(resp)
        this.navCtrl.pop().then(() => this.viewCtrl.dismiss())
      }
    )
  }

}
