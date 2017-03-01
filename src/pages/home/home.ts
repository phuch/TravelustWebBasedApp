import { UserService } from './../../providers/user-service';
import { MediaService } from './../../providers/media-service';
import { Component, OnInit} from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { JournalPage } from './../journal/journal';
import Rx from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MediaService]
})
export class HomePage implements OnInit {
  //private shouldEnable: boolean = true;
  private start: number = 0;
  private medias: any = [];

  url: string = 'http://media.mw.metropolia.fi/wbma/uploads/'
  constructor(public app: App, public navCtrl: NavController, private mediaService: MediaService, private userService: UserService) {
  }

  ngOnInit () {
    this.getMedia();
  }

  getMedia = () =>{
    this.mediaService.getMedia(this.start).subscribe(
        resp => {
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
      this.start += 10;
      this.getMedia();
      infiniteScroll.complete();
    }, 1000);
  }

  navigateToJournal = (media: any) => {
    this.app.getRootNav().push(JournalPage, {media: media});
  }

}
