import { UserAccountPage } from './../user-account/user-account';
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
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = JournalUploadPage;
  tab3Root: any = UserAccountPage;


  constructor() {

  }
}
