import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { LoginService } from './../../providers/login-service';
import { WelcomePage } from './../welcome/welcome';
import { EditUserInfoPage } from './../edit-user-info/edit-user-info';

/*
  Generated class for the AccountSetting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-setting',
  templateUrl: 'account-setting.html',
  providers: [LoginService]
})
export class AccountSettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService,private app: App, private alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountSettingPage');
  }

  logout = () => {
    this.loginService.logout();
    this.app.getRootNav().setRoot(WelcomePage);
  }

  goToEditUserInfoPage = () => {
    this.app.getRootNav().push(EditUserInfoPage);
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Log out of Travelust?',
      message: 'Are you sure to logout of this app?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    confirm.present();
  }

}
