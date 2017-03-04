import { PopoverPage } from './popover/popover';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, PopoverController} from 'ionic-angular';
import { MediaService } from './../../providers/media-service';
import { UserService } from './../../providers/user-service';
import Rx from 'rxjs';

/*
  Generated class for the Journal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
  providers: [MediaService, UserService]
})
export class JournalPage {
  private mediaList: any = [];
  private isOwner: boolean = false;
  private isLiked: boolean = false;
  private heartIcon: string = "heart-outline";
  private likes:number;
  private isSaved: boolean = false;
  private saveText: string = "Save journal";
  private saveIcon: string = "bookmark";
  private media: any = {};
  private users: any = [];
  private url: string = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService, private userService: UserService, private popoverCtrl: PopoverController) {}

  ionViewDidLoad() {
      console.log('ionViewDidLoad JournalPage');
      //this.media = this.navParams.get("media");
  }

  ionViewWillEnter () {
      //Get file id passed from old page
      this.media = this.navParams.get("media");
      //Get media of this journal
      this.loadMedia(encodeURIComponent("#travelust_subjournal_beta_" + this.media.file_id));
      //Check whether the current user is the owner
      if (this.media.user_id == this.userService.getUserFromLocal().user_id)
          this.isOwner = true;
      else
          this.isOwner = false;
  }

  likeJournal = () => {
      this.isLiked = !this.isLiked;
      if(this.isLiked){
          this.heartIcon = "heart";
          this.mediaService.createFileFavourite(this.media.file_id)
          .subscribe(
              res => {
                  console.log(res);
                  this.favouriteDisplay(this.media.file_id);
              }
          );
      }else {
          this.heartIcon = "heart-outline";
          this.mediaService.deleteFileFavourite(this.media.file_id)
          .subscribe(
              res => {
                  console.log(res);
                  this.favouriteDisplay(this.media.file_id);
              }
          );
      }
  }

  saveJournal = () => {
      this.isSaved = !this.isSaved;
      if(this.isSaved){
          this.saveIcon = "md-checkmark";
          this.saveText = "Journal saved";
      }else {
          this.saveIcon = "bookmark";
          this.saveText = "Save journal";
      }
  }

  presentPopover = (ev) => {
      let popover = this.popoverCtrl.create(PopoverPage, {media: this.media});
      popover.present({
        ev: ev
      });
  }

  //Configure display for favourite section
  favouriteDisplay = (fileId:any) => {
      this.mediaService.getFileFavorite(fileId)
      .subscribe(
          resFav => {
                //Get number of favourites
                this.media.numberOfLikes = resFav.length;
                //Check whether current user is the author
                let exist: any;
                for (var i = 0; i < resFav.length; i++){
                    if (resFav[i].user_id ===  this.userService.getUserFromLocal().user_id){
                        exist = true;
                        break;
                    }
                }
                //Check whether number of likes = 0
                if (!exist){
                    this.isLiked = false;
                    this.heartIcon = "heart-outline";
                }
                else{
                    this.isLiked = true;
                    this.heartIcon = "heart";
                }
          }
      );
  }

  loadMedia = (tag: any) => {
      this.mediaService.getFilesByTag(tag)
      .subscribe(
            resp => {
                console.log(resp)
                this.mediaList = resp;
            }
      )
  }

}
