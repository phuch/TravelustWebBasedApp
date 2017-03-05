import { UserService } from './../../providers/user-service';
import { MediaService } from './../../providers/media-service';
import { PostTimePipe } from './../../pipes/post-time-pipe';
import { Component, OnInit} from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common'
import { JournalPage } from './../journal/journal';
import Rx from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MediaService, UserService, PostTimePipe, DatePipe]
})

export class HomePage {
  private shouldEnable: boolean = true;
  private start: number = 0;
  private medias: any = [];
  private url: string = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(public app: App, public navParams: NavParams, public navCtrl: NavController, private mediaService: MediaService, private userService: UserService,
              public postTimePipe: PostTimePipe, public datePipe: DatePipe) {}

  ionViewDidEnter() {
    console.log(this.navParams.data.isUploaded);
    if (this.navParams.data.isUploaded){
        this.medias = [];
        this.start = 0;
        this.navParams.data.isUploaded = false;
    }
    this.getMedia();
  }

  getMedia = () =>{
    this.mediaService.getMedia(this.start).subscribe(
        resp => {
          // //Create an observable from response
          // const promiseLoadMedia = data => new Promise(
          //    (resolve, reject) => {
          //         //Check whether this file is a journal and belongs to Travelust
          //         this.mediaService.getTagsByFileId(data.file_id).subscribe(
          //             respTag => {
          //                 var check: boolean = false;
          //                 for (let tag of respTag){
          //                     var correctTag = "#travelust_journal_beta_" + data.file_id;
          //                     if (tag.tag === correctTag){
          //                         check = true;
          //                         break;
          //                     }
          //                 }

          //                 //If it is, add to list of media files
          //                 if (check){
          //                     //Add accepted journal
          //                     this.medias.push(data);
          //                     //Display posting time
          //                     let timeAdded = new Date(data.time_added);
          //                     data.postTime = this.postTimePipe.transform(timeAdded.getTime())
          //                     if (data.postTime == "false")
          //                         data.postTime = this.datePipe.transform(timeAdded.getTime(), 'medium')
          //                     //Display author of the journal
          //                     this.userService.getUserInfo(data.user_id).subscribe(
          //                       resp => {
          //                         data.author = resp.username;
          //                       }
          //                     );
          //                 }
          //                 resolve("Check whether media file belongs to Travelust succeeded")
          //             },
          //             err => reject("Check whether media file belongs to Travelust failed")
          //         )
          //    }
          // )
          // const source = Rx.Observable.from(resp).concatMap(val => promiseLoadMedia(val)).subscribe();
           //Create an observable from response
          const source = Rx.Observable.from(resp);
          source.subscribe(
              (data:any) => {
                  //Check whether this file is a journal and belongs to Travelust
                  this.mediaService.getTagsByFileId(data.file_id).subscribe(
                      respTag => {
                          var check: boolean = false;
                          for (let tag of respTag){
                              var correctTag = "#travelust_journal_beta_" + data.file_id;
                              if (tag.tag === correctTag){
                                  check = true;
                                  break;
                              }
                          }

                          //If it is, add to list of media files
                          if (check){
                              this.medias.push(data);
                              data.dayPosted = data.time_added.substring(0, data.time_added.indexOf('T'));
                              this.userService.getUserInfo(data.user_id).subscribe(
                                resp => {
                                  data.author = resp.username;
                                }
                              );
                          }
                          console.log(this.medias);
                      }
                  )
              }
          )

        }
    );
  }

  doInfinite (infiniteScroll: any) {
    setTimeout(() => {
      this.start += 50;
      this.getMedia();
      infiniteScroll.complete();
    }, 1000);
  }

  navigateToJournal = (media: any) => {
    this.app.getRootNav().push(JournalPage, {media: media});
  }

}
