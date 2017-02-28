import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the JournalAddMedia page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-journal-add-media',
  templateUrl: 'journal-add-media.html'
})
export class JournalAddMediaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalAddMediaPage');
  }

}
