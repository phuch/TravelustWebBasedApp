import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  private owner: string = "";
  private likes:number;
  private likeStr: string = "";
  private users: any = [];
  private button:string = "";
  //func responses to click on LIKE button
  private onClick: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService, private userService: UserService) {}

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
          //Get chosen file owner
          this.userService.getUserInfo(this.file.user_id).subscribe(resUser => this.owner = resUser.username);
          //Set up display for favourites
          this.favouriteDisplay(this.file_id);
        }
      );
  }

  //like a post
  likePost = () => {
      this.mediaService.createFileFavourite(this.file_id)
      .subscribe(
          res => {
            console.log(res)
            if (res.message === "Favourite added"){
              this.button = "Unlike";
              this.onClick = this.unlikePost;
              this.favouriteDisplay(this.file_id);
            }
          }
      );
  }

  //unlike a post
  unlikePost = () => {
      this.mediaService.deleteFileFavourite(this.file_id)
      .subscribe(
          res => {
            console.log(res)
            if (res.message === "Favourite deleted"){
              this.button = "Like";
              this.onClick = this.likePost;
              this.favouriteDisplay(this.file_id);
            }
          }
      );
  }

  //Configure display for favourite section
  favouriteDisplay = (fileId:any) => {
    this.mediaService.getFileFavorite(fileId)
    .subscribe(
        resFav => {
          //Re-init users' list
          this.users = [];
          //Get number of favourites
          this.likes = resFav.length;
          //Set like display
          if (this.likes > 1)
              this.likeStr = "likes from";
          else if (this.likes == 0)
              this.likeStr = "like";
          else
              this.likeStr = "like from";
          //Set button display and function
          let exist: any;
          for (var i = 0; i < resFav.length; i++){
              if (resFav[i].user_id ===  this.userService.getUserFromLocal().user_id){
                  exist = true;
                  break;
              }
          }
          if (exist){
              this.button = "Unlike";
              this.onClick = this.unlikePost;
          }else{
              this.button = "Like"
              this.onClick = this.likePost;
          }

          //Get users who like the post
          for (var i = 0; i < resFav.length; i++){
            this.userService.getUserInfo(resFav[i].user_id).subscribe(resUser => this.users.push(resUser.username));
          }
      }
    );
  }

  trackByUsers = (index: number, user: string) => {
    return user;
  }
}
