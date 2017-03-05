import { MediaService } from './../../providers/media-service';
import { UserService } from './../../providers/user-service';
import { AccountSettingPage } from './../account-setting/account-setting';
import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';

/*
  Generated class for the UserAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-account',
  templateUrl: 'user-account.html',
  providers: [UserService, MediaService]
})
export class UserAccountPage {
  private user: any = {};
  private journals: number = 0;
  private addIcon : string = "md-add";
  private addText : string = "Add user";
  private isAdded : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public userService: UserService, public mediaService: MediaService) {}

  ionViewWillEnter() {
    console.log('ionViewDidLoad UserAccountPage');
    this.getCurrentUser();
    this.getJournalOfCurrentUser();
  }

  goToSetting = () => {
    this.app.getRootNav().push(AccountSettingPage);
  }

  getCurrentUser = () => {
    this.userService.getCurrentUser().subscribe(
      res => {
        console.log(res);
        this.user.username = res.username
        this.user.fullname = res.full_name
      }
    )
  }

  getJournalOfCurrentUser = () => {
    let coverTag: string = "#travelust_myjournal_beta_" + this.userService.getUserFromLocal().user_id;
    console.log(coverTag);
    this.mediaService.getFilesByTag(encodeURIComponent(coverTag)).subscribe(
      res => {
        console.log(res);
        this.journals = res.length;
      }
    );

  }



  // getFilesOfCurrentUser = () => {
  //   this.mediaService.getFilesOfCurrentUser().subscribe(
  //     res => {
  //       console.log(res);
  //       this.journals = res.length;
  //     }
  //   );
  // }

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

