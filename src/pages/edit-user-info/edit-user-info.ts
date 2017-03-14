import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from './../../providers/user-service';

/*
  Generated class for the EditUserInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-user-info',
  templateUrl: 'edit-user-info.html',
  providers: [UserService]
})
export class EditUserInfoPage {
  private user: any;
  private username: any;
  private password: any;
  private email: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService) {}

  ionViewDidLoad() {
    this.user = this.userService.getUserFromLocal()
    this.username = this.user.username;
    this.email = this.user.email;
    this.password = "";
    console.log('ionViewDidLoad EditUserInfoPage');
  }

  editUserInfo = (value: any) => {
    let newInfo: any;
    if (value.password){
      newInfo = {
        username: value.username,
        password: value.password,
        email: value.email
      }
    } else {
      newInfo = {
        username: value.username,
        email: value.email
      }
    }

    this.userService.editUserInfo(newInfo).subscribe(
        resp => {
          console.log(resp);
          this.navCtrl.pop();
        }
    );

  }

}
