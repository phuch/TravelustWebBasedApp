import { JournalsOfUserPage } from './../journals-of-user/journals-of-user';
import { MediaService } from './../../providers/media-service';
import { UserService } from './../../providers/user-service';
import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';

/*
  Generated class for the OtherAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-other-account',
  templateUrl: 'other-account.html',
  providers: [UserService, MediaService]
})
export class OtherAccountPage {

  private user_id: string = '';
  private user: any = {};
  private journals: any = [];
  private isAdded: boolean = false;
  private addIcon : string = "md-add";
  private addText : string = "Add user";

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public mediaService: MediaService, public app: App) {}

  ionViewDidLoad() {
    //get user_id from homepage
    this.user_id = this.navParams.get('media').user_id;
    console.log(this.user_id);
    console.log('ionViewDidLoad OtherAccountPage');
  }

  ionViewWillEnter() {
    this.getUserInfo();
    this.getJournalOfCurrentUser();
  }

  goToJournals = () => {
    this.app.getRootNav().push(JournalsOfUserPage, {journals: this.journals});
  }

  getUserInfo = () => {
    this.userService.getUserInfo(this.user_id).subscribe(
      res => {
        this.user = res;
        console.log(this.user);
      }
    )
  }

  getJournalOfCurrentUser = () => {
    let coverTag: string = "#travelust_myjournal_beta_" + this.user_id;
    console.log(coverTag);
    this.mediaService.getFilesByTag(encodeURIComponent(coverTag)).subscribe(
      res => {
        console.log(res);
        this.journals = res;
      }
    );

  }

  addUser = () => {
    this.isAdded = !this.isAdded;
    if(this.isAdded) {
      this.addIcon = "md-checkmark"
      this.addText = "User added"
    }else {
      this.addIcon = "md-add";
      this.addText = "Add user"
    }
  }

}
