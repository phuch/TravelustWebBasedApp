import { UserService } from './../../../providers/user-service';
import { MediaService } from './../../../providers/media-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Comment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
  providers: [MediaService, UserService]
})
export class CommentPage {

  private file_id: string = '';
  private comment: string = '';
  private callback: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaService: MediaService, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
    this.file_id = this.navParams.get('fileId');
    this.callback  = this.navParams.get('callback');
  }

  commentMedia = () => {
    let comment = {
      file_id : this.file_id,
      comment : this.comment
    }
    this.mediaService.createComment(comment).subscribe(
      res => {
        this.viewCtrl.dismiss().then(() => this.callback());
        console.log(res);

      }
    )
  }

}
