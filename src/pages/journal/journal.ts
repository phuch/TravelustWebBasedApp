import { PopoverPage } from './popover/popover';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController} from 'ionic-angular';

/*
  Generated class for the Journal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage {

  isLiked: boolean = false;
  heartIcon: string = "heart-outline";
  isSaved: boolean = false;
  saveText: string = "Save journal";
  saveIcon: string = "bookmark";


  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalPage');
  }

  likedJournal = () => {
    this.isLiked = !this.isLiked;
    if(this.isLiked){
      this.heartIcon =  "heart";
    }else {
      this.heartIcon = "heart-outline";
    }
  }

  savedJournal = () => {
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
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: ev
    });
  }

}
