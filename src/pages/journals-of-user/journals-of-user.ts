import { DatePipe } from '@angular/common';
import { PostTimePipe } from './../../pipes/post-time-pipe';
import { JournalPage } from './../journal/journal';
import { UserService } from './../../providers/user-service';
import { MediaService } from './../../providers/media-service';
import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
/*
  Generated class for the JournalsOfUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-journals-of-user',
  templateUrl: 'journals-of-user.html',
  providers: [MediaService, UserService, PostTimePipe, DatePipe]
})
export class JournalsOfUserPage {

  private journals: any = [];
  private url: string = 'http://media.mw.metropolia.fi/wbma/uploads/';


  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public mediaService: MediaService, public userService: UserService, public postTimePipe: PostTimePipe, public datePipe: DatePipe) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalsOfUserPage');
    this.journals = this.navParams.get("journals");
    console.log(this.journals);
    for (var journal of this.journals){

      let timeAdded = new Date(journal.time_added);
      journal.postTime = this.postTimePipe.transform(timeAdded.getTime())
      if (journal.postTime == "false")
          journal.postTime = this.datePipe.transform(timeAdded.getTime(), 'medium')
    }
  }

  navigateToJournal = (journal: any) => {
    this.app.getRootNav().push(JournalPage, {media: journal});
  }
}
