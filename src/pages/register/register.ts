import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: FirebaseProvider) {
  }

  register(value){
    this.db.register(value)
    .then(()=>{
      alert("Success");
      this.navCtrl.pop();
    })
    .catch((e)=>{
      alert(e);
    })
  }

}
