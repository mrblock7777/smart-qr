import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: FirebaseProvider) {
  }

  logout(){
    if(confirm("Are you sure you want to log out?")){
      this.db.logout();
    }
  }
  profile(){
    this.navCtrl.push(ProfilePage);
  }

}
