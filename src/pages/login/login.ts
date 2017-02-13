import { LoginService } from './../../providers/login-service';
import { TabsPage } from './../tabs/tabs';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
    if(localStorage.getItem("user") !== null) {
      this.loginService.setUser(JSON.parse(localStorage.getItem("user")));
      this.loginService.isLogged = true;
      this.navCtrl.push(TabsPage);
    } else if (this.loginService.getUser().password !== undefined){
      this.loginService.login();
    }
  }



  login = (value: any) => {

      this.loginService.setUser(value);
      console.log(this.loginService.login());
      // if(this.loginService.login()){
      //   this.navCtrl.push(TabsPage);
      // }else{
      //   console.log("You haven't registered or your password does not match");
      // }



  }
}
