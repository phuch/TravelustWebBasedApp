import { MyAccountPage } from './../my-account/my-account';
import { NavParams } from 'ionic-angular';
import { LoginService } from './../../providers/login-service';
import { JournalUploadPage } from './../journal-upload/journal-upload';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { UserService } from './../../providers/user-service';

@Component({
  templateUrl: 'tabs.html',
  providers: [UserService, LoginService]
})
export class TabsPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  constructor() {
  // this tells the tabs component which Pages
  // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root  = JournalUploadPage;
    this.tab3Root = MyAccountPage;
  }
}
