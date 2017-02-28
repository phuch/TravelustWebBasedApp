import { JournalAddMediaPage } from './../../journal-add-media/journal-add-media';
import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Popover page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {



  constructor(public _app: App, public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  goToAddPhoto = () => {
    this._app.getRootNav().push(JournalAddMediaPage).then(() => this.viewCtrl.dismiss());
  }

}
