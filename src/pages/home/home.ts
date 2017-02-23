import { UserService } from './../../providers/user-service';
import { MediaService } from './../../providers/media-service';
import { Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailViewPage } from './../detail-view/detail-view';
import { Observable } from 'rxjs/Rx'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MediaService]
})
export class HomePage implements OnInit {
  private shouldEnable: boolean = true;
  private start: number = 0;
  private medias: any = [];

  url: string = 'http://media.mw.metropolia.fi/wbma/uploads/'
  constructor(public navCtrl: NavController, private mediaService: MediaService, private userService: UserService) {
  }

  ngOnInit () {
    localStorage.setItem("lastMedia", "229");
    this.getMedia();
  }

  getMedia = () =>{
    this.mediaService.getMedia(this.start).subscribe(
        resp => {
          if (resp.length == 0)
              this.shouldEnable = false;
          for(let data of resp) {
              //Check whether this file is a journal and belongs to Travelust
              this.mediaService.getTagByFileId(data.file_id).subscribe(
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
                  }
              )
          }
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

  navigateToDetail = (fileId: any) => {
    this.navCtrl.push(DetailViewPage, {fileId: fileId});
  }

}
