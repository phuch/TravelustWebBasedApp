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

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public userService: UserService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAccountPage');
    this.getCurrentUser();
  }

  goToSetting = () => {
    this.app.getRootNav().push(AccountSettingPage);
  }

  getCurrentUser = () => {
    this.userService.getCurrentUser().subscribe(
      res => {
        console.log(res);
        this.user.username = res.username
      }
    )
  }


}

