import { PopoverDetailViewPage } from './popover-detail-view/popover-detail-view';
import { CommentPage } from './comment/comment';
import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams, ViewController, PopoverController, ActionSheetController } from 'ionic-angular';
import { MediaService } from './../../providers/media-service';
import { UserService } from './../../providers/user-service';
import { DatePipe } from '@angular/common';
import { PostTimePipe } from './../../pipes/post-time-pipe';

/*
  Generated class for the DetailView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-view',
  templateUrl: 'detail-view.html',
  providers: [MediaService, UserService, PostTimePipe, DatePipe]
})
export class DetailViewPage implements OnInit{
  //fields to display info
  private file_id: number;
  private file:any = {};
  private isOwner: boolean = false;
  private isLiked: boolean = false;
  private heartIcon: string = "heart-outline";
  private comments: any = [];

  constructor(public actionSheetCtrl: ActionSheetController, public popoverCtrl: PopoverController,public app: App,public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService, private userService: UserService, public postTimePipe: PostTimePipe, public datePipe: DatePipe) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailViewPage');
  }

  ngOnInit () {
    //Get chosen file
    this.file_id = this.navParams.get("fileId");
    console.log(this.file_id + " testttt")
    this.mediaService.getSingleMedia(this.file_id)
      .subscribe(
        res => {
          this.file = res;
           let timeAdded = new Date(this.file.time_added);
            this.file.postTime = this.postTimePipe.transform(timeAdded.getTime())
            if (this.file.postTime == "false")
                this.file.postTime = this.datePipe.transform(timeAdded.getTime(), 'medium')
           if (this.file.user_id == this.userService.getUserFromLocal().user_id)
              this.isOwner = true;
           else
              this.isOwner = false;
          //Set up display for favourites
          this.favouriteDisplay(this.file_id);
        }
      );
  }

  ionViewWillEnter () {
    console.log("Enterrrr")
    this.getComment();
  }

  likeMedia = () => {
      this.isLiked = !this.isLiked;
      if(this.isLiked){
          this.heartIcon = "heart";
          this.mediaService.createFileFavourite(this.file_id)
          .subscribe(
              res => {
                  console.log(res);
                  this.favouriteDisplay(this.file_id);
              }
          );
      }else {
          this.heartIcon = "heart-outline";
          this.mediaService.deleteFileFavourite(this.file_id)
          .subscribe(
              res => {
                  console.log(res);
                  this.favouriteDisplay(this.file_id);
              }
          );
      }
  }

  favouriteDisplay = (fileId:any) => {
      this.mediaService.getFileFavorite(fileId)
      .subscribe(
          resFav => {
                //Check whether current user is the author
                let exist: any;
                for (var i = 0; i < resFav.length; i++){
                    if (resFav[i].user_id ===  this.userService.getUserFromLocal().user_id){
                        exist = true;
                        break;
                    }
                }
                //Display whether current user has liked or not
                if (!exist){
                    this.isLiked = false;
                    this.heartIcon = "heart-outline";
                }
                else{
                    this.isLiked = true;
                    this.heartIcon = "heart";
                    //this.isSaved = false;
                }
          }
      );
  }

  presentComment = (ev) => {
      let popover = this.popoverCtrl.create(CommentPage, {fileId: this.file_id, callback: this.getComment});
      popover.present({
        ev: ev
      });
  }

  presentPopover = (ev) => {
      let popover = this.popoverCtrl.create(PopoverDetailViewPage, {file: this.file});
      popover.present({
        ev: ev
      });
  }

  getComment = () => {
    this.mediaService.getCommentsByFileId(this.file_id).subscribe(
        res => {
          this.comments = res;
          console.log(this.comments);

          for(let comment of this.comments){
            //get time added of comment
            let timeAdded = new Date(comment.time_added);
            comment.postTime = this.postTimePipe.transform(timeAdded.getTime(), "displayForComment")
            if (comment.postTime == "false")
                comment.postTime = this.datePipe.transform(timeAdded.getTime(), 'medium')
            //get author of comment
            this.userService.getUserInfo(comment.user_id).subscribe(
               userRes => {
                  comment.username = userRes.username;
                  console.log(comment.username);
               }
            )
          }
        }
    )
  }

  presentActionSheet(comment: any) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteComment(comment);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  deleteComment = (comment: any) => {
    //for (let comment of this.comments){
      this.mediaService.deleteCommentByCommentId(comment.comment_id).subscribe(
        res => {
          console.log(res)
          this.comments.splice(this.comments.indexOf(comment), 1)
        }
      )
    //}
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
