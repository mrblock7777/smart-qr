import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-qr',
  templateUrl: 'view-qr.html',
})
export class ViewQrPage {

  private db;
  private data;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.data = this.navParams.get('data');
  }
  ionViewWillEnter(){
    this.db = new PouchDB('qr-test');
  }

  deleteData(data){
    this.db.get(data._id)
    .then(response =>{
      return this.db.remove(response);
    })
    .then(() =>{
      this.navCtrl.pop();
    })
    .catch((e) =>{
      alert(e)
    })
  }

}
