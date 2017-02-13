import { TabsPage } from './../tabs/tabs';
import { Media } from './../../providers/media';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Media]
})
export class LoginPage {
  private username: string = '';
  private password: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaservice: Media) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login = () => {
    const user = {
      username: this.username,
      password: this.password
    }

    this.mediaservice.setUser(user);
    this.mediaservice.login();
    this.navCtrl.push(TabsPage);
  }


}
