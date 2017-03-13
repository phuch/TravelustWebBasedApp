import { PopoverDetailViewPage } from './../pages/detail-view/popover-detail-view/popover-detail-view';
import { CommentPage } from './../pages/detail-view/comment/comment';
import { OtherAccountPage } from './../pages/other-account/other-account';
import { MyAccountPage } from './../pages/my-account/my-account';
import { JournalsOfUserPage } from './../pages/journals-of-user/journals-of-user';
import { AccountSettingPage } from './../pages/account-setting/account-setting';
import { EditJournalInfoPage } from './../pages/edit-journal-info/edit-journal-info';
import { EditUserInfoPage } from './../pages/edit-user-info/edit-user-info';
import { JournalAddMediaPage } from './../pages/journal-add-media/journal-add-media';
import { PopoverPage } from './../pages/journal/popover/popover';
import { JournalPage } from './../pages/journal/journal';
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
    JournalPage,
    PopoverPage,
    EditJournalInfoPage,
    AccountSettingPage,
    JournalAddMediaPage,
    JournalsOfUserPage,
    MyAccountPage,
    OtherAccountPage,
    CommentPage,
    PopoverDetailViewPage,
    EditUserInfoPage
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
    JournalPage,
    PopoverPage,
    EditJournalInfoPage,
    AccountSettingPage,
    JournalAddMediaPage,
    JournalsOfUserPage,
    MyAccountPage,
    OtherAccountPage,
    CommentPage,
    PopoverDetailViewPage,
    EditUserInfoPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
