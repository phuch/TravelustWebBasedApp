import { WelcomePage } from './../welcome/welcome';
import { LoginService } from './../../providers/login-service';
import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';

/*
  Generated class for the UserAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-account',
  templateUrl: 'user-account.html'
})
export class UserAccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService,private app: App, private alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAccountPage');
  }



  logout = () => {
    this.loginService.logout();
    this.app.getRootNav().setRoot(WelcomePage);
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
