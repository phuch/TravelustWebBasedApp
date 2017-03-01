import { JournalPage } from './../journal/journal';
import { UserService } from './../../providers/user-service';
import { MediaService } from './../../providers/media-service';
import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EditJournalInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-journal-info',
  templateUrl: 'edit-journal-info.html',
  providers: [MediaService, UserService]
})
export class EditJournalInfoPage {

  private media: any;
  public title: any;
  public description: any;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public mediaService: MediaService, public userService: UserService) {}

  ionViewDidLoad() {
    this.media = this.navParams.get("media");
    this.title = this.media.title;
    this.description = this.media.description;
    console.log(this.title + ' ' + this.description);
    console.log(this.media);
    console.log('ionViewDidLoad EditJournalInfoPage');
  }

  editJournalInfo = (value: any) => {

    // let newInfo2: any = {};
    // if (value.title)
    //     newInfo2.title = value.title;
    // if (value.description)
    //     newInfo2.description = value.description;

    //Option 1
    const newInfo = {
        title: value.title,
        description: value.description
    }

    this.mediaService.editJournalInfo(this.media.file_id, newInfo).subscribe(
        resp => {
          console.log(resp);
          console.log(this.media);
          this.media.title = newInfo.title;
          this.media.description = newInfo.description;
          this.navCtrl.pop();
          //this.navCtrl.push(JournalPage, { media: this.media });
        }
    );

  }

}
