import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { PostTimePipe } from './../../pipes/post-time-pipe';
import { JournalPage } from './../journal/journal';
import { UserService } from './../../providers/user-service';
import { MediaService } from './../../providers/media-service';

/*
  Generated class for the SavedJournal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-saved-journal',
  templateUrl: 'saved-journal.html',
  providers: [MediaService, UserService, PostTimePipe, DatePipe]
})
export class SavedJournalPage {
  private save_journals: any = [];
  private url: string = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public mediaService: MediaService, public userService: UserService, public postTimePipe: PostTimePipe, public datePipe: DatePipe) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavedJournalPage');
    this.save_journals = this.navParams.get("journals");
    console.log(this.save_journals);

    for (let journal of this.save_journals){
      let timeAdded = new Date(journal.time_added);
      journal.postTime = this.postTimePipe.transform(timeAdded.getTime())
      if (journal.postTime == "false")
          journal.postTime = this.datePipe.transform(timeAdded.getTime(), 'medium')

      this.userService.getUserInfo(journal.user_id).subscribe(
        resp => {
          journal.author = resp.username;
        }
      );
    }
  }

  navigateToJournal = (journal: any) => {
    this.app.getRootNav().push(JournalPage, {media: journal});
  }

}
