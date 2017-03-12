import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { MediaService } from './../../providers/media-service';
import { UserService } from './../../providers/user-service';

/*
  Generated class for the DetailView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-view',
  templateUrl: 'detail-view.html',
  providers: [MediaService, UserService]
})
export class DetailViewPage implements OnInit{
  //fields to display info
  private file_id: number;
  private file:any = {};
  private isOwner: boolean = false;
  private isLiked: boolean = false;
  private heartIcon: string = "heart-outline";
  private likes:number;
  private likeStr: string = "";
  private users: any = [];
  private button:string = "";
  //func responses to click on LIKE button
  private onClick: any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService, private userService: UserService) {}

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
           if (this.file.user_id == this.userService.getUserFromLocal().user_id)
              this.isOwner = true;
           else
              this.isOwner = false;
          //Set up display for favourites
          this.favouriteDisplay(this.file_id);
        }
      );
  }

  likeImage = () => {
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
                //Get number of favourites
                //this.journal.numberOfLikes = resFav.length;
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

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
