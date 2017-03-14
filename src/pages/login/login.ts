import { LoginService } from './../../providers/login-service';
import { TabsPage } from './../tabs/tabs';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage implements OnInit {
  private user: any = {};
  private toast: any;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit() {
  }

  login = (value: any) => {
      this.loginService.setUser(value);
      this.loginService.login().subscribe(
        resp => {
          //save user data to local storage
          this.user = resp.user;
          this.user.token = resp.token;
          console.log(this.user.token);
          console.log(this.user);
          localStorage.setItem('user', JSON.stringify(this.user));
          this.navCtrl.push(TabsPage);
          this.loginService.setLoggedIn(true);
        },
        //error handler
        err => {
            this.presentToast("Username or password does not match");
            this.loginService.setLoggedIn(false);
        }
      )
  }

  presentToast = (msg: string) => {
    this.toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'top'
    });
    this.toast.present();
  }
}
