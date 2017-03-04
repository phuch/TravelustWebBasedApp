import { AccountSettingPage } from './../pages/account-setting/account-setting';
import { EditJournalInfoPage } from './../pages/edit-journal-info/edit-journal-info';
import { JournalAddMediaPage } from './../pages/journal-add-media/journal-add-media';
import { PopoverPage } from './../pages/journal/popover/popover';
import { JournalPage } from './../pages/journal/journal';
import { UserAccountPage } from './../pages/user-account/user-account';
import { JournalUploadPage } from './../pages/journal-upload/journal-upload';
import { RegisterPage } from './../pages/register/register';
import { WelcomePage } from './../pages/welcome/welcome';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailViewPage } from '../pages/detail-view/detail-view';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    WelcomePage,
    RegisterPage,
    JournalUploadPage,
    DetailViewPage,
    UserAccountPage,
    JournalPage,
    PopoverPage,
    EditJournalInfoPage,
<<<<<<< HEAD
    AccountSettingPage
=======
    JournalAddMediaPage
>>>>>>> abf302455d4edcead12c38de1ae5b5c033600b32
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios'
    }, {}
  )],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    WelcomePage,
    RegisterPage,
    JournalUploadPage,
    DetailViewPage,
    UserAccountPage,
    JournalPage,
    PopoverPage,
    EditJournalInfoPage,
<<<<<<< HEAD
    AccountSettingPage
=======
    JournalAddMediaPage
>>>>>>> abf302455d4edcead12c38de1ae5b5c033600b32
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
