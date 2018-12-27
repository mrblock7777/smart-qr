import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private profile = {};
  private participation = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private profileProvider: ProfileProvider,
    private db: FirebaseProvider) {
  }
  ionViewWillEnter(){
    this.getProfile();
    this.getParticipation();
  }
  getProfile(){
    this.profileProvider.getProfile().subscribe(auth =>{
      if(auth){
        this.db.getData('users').where('email','==',auth.email).get()
        .then(doc =>{
          doc.forEach(item =>{
            
            this.profile = item.data();
          })
        })
      }
    })
  }
  getParticipation(){
    this.profileProvider.getProfile().subscribe(auth =>{
      if(auth){
        this.db.getData('participation').where('email','==',auth.email).get()
        .then(doc =>{
          doc.forEach(item =>{
            let participation = item.data().participation;
            participation.map(data=>{
              console.log(data);
              this.participation.push(data);
            })
          })
        })
      }
    })
  }

}
