import { LoginService } from './../../providers/login-service';
import { JournalUploadPage } from './../journal-upload/journal-upload';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import { UserService } from './../../providers/user-service';

@Component({
  templateUrl: 'tabs.html',
<<<<<<< HEAD
  providers: [LoginService]
=======
  providers: [UserService]
>>>>>>> 86d3dc46d09fbc4da97b3a7315ad05808dfa329e
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = JournalUploadPage;
  tab3Root: any = ContactPage;

  constructor() {

  }
}
