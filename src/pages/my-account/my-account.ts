import { JournalsOfUserPage } from './../journals-of-user/journals-of-user';
import { SavedJournalPage } from './../saved-journal/saved-journal';
import { MediaService } from './../../providers/media-service';
import { UserService } from './../../providers/user-service';
import { AccountSettingPage } from './../account-setting/account-setting';
import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';

/*
  Generated class for the MyAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
  providers: [UserService, MediaService]
})
export class MyAccountPage {

  private user: any = {};
  private isOwner: boolean = false;
  private journals: any = [];
  private save_journals: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public userService: UserService, public mediaService: MediaService) {}

  ionViewDidLoad() {

     this.user.fullname = this.userService.getUserFromLocal().full_name;
     this.user.id = this.userService.getUserFromLocal().user_id;
     this.user.username = this.userService.getUserFromLocal().username;
     if(this.user.id === this.userService.getUserFromLocal().user_id)
        this.isOwner = true;
     else
        this.isOwner = false;
  }
  ionViewDidEnter() {
    console.log('ionViewDidLoad MyAccountPage');
    this.getJournalOfCurrentUser();
    this.getSavedJournalOfCurrentUser();
  }

  goToSetting = () => {
    this.app.getRootNav().push(AccountSettingPage);
  }

  goToJournals = () => {
    this.app.getRootNav().push(JournalsOfUserPage, {journals: this.journals});
  }

  goToSaveJournals = () => {
    this.app.getRootNav().push(SavedJournalPage, {journals: this.save_journals});
  }

  getJournalOfCurrentUser = () => {
    let coverTag: string = "#travelust_myjournal_beta_" + this.userService.getUserFromLocal().user_id;
    console.log(coverTag);
    this.mediaService.getFilesByTag(encodeURIComponent(coverTag)).subscribe(
      res => {
        console.log(res);
        this.journals = res;
      }
    );
  }

  getSavedJournalOfCurrentUser = () => {
    let coverTag: string = "#travelust_savejournal_beta_" + this.userService.getUserFromLocal().user_id;
    console.log(coverTag);
    this.mediaService.getFilesByTag(encodeURIComponent(coverTag)).subscribe(
      res => {
        console.log(res);
        this.save_journals = res;
      }
    );
  }

}
