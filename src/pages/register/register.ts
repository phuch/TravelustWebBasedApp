import { TabsPage } from './../tabs/tabs';
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
  private user: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register = (value: any) => {
    this.loginService.setUser(value);
    this.loginService.register().subscribe(
      resp => {
        this.user.user_id = resp.user_id
        console.log(this.user);
        this.loginService.login().subscribe(
          resp => {
            //save user data to local storage
            this.user = resp.user;
            this.user.token = resp.token;
            console.log(this.user);
            localStorage.setItem('user', JSON.stringify(this.user));
            this.navCtrl.push(TabsPage);
            this.loginService.setLoggedIn(true);
          }
        );
      }
    );
  }

}
