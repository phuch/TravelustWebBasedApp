import { JournalPage } from './../journal/journal';
import { UserService } from './../../providers/user-service';
import { MediaService } from './../../providers/media-service';
import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
/*
  Generated class for the JournalsOfUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-journals-of-user',
  templateUrl: 'journals-of-user.html',
  providers: [MediaService, UserService]
})
export class JournalsOfUserPage {

  private journals: any = [];
  private url: string = 'http://media.mw.metropolia.fi/wbma/uploads/';


  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public mediaService: MediaService, public userService: UserService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalsOfUserPage');
    this.journals = this.navParams.get("journals");
    console.log(this.journals);
  }

  navigateToJournal = (journal: any) => {
    this.app.getRootNav().push(JournalPage, {media: journal});
  }
}
