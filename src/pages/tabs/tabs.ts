import { JournalUploadPage } from './../journal-upload/journal-upload';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
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
