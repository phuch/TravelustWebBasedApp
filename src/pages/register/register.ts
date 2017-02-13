import { LoginService } from './../../providers/login-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [LoginService]
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register = (value: any) => {
    this.loginService.setUser(value);
    this.loginService.register();
  }

}
