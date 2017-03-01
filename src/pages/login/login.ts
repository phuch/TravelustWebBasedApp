import { LoginService } from './../../providers/login-service';
import { TabsPage } from './../tabs/tabs';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toast } from 'ionic-native';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService) {}

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
          if(err.statusText == "Unauthorized"){
            console.log("You haven't registered or your password does not match");
            Toast.show("You haven't registered or your password does not match", "short", "bottom").subscribe(
              toast => console.log(toast)
            )
            this.loginService.setLoggedIn(false);
          }
        }
      )
  }
}
