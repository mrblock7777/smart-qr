import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: FirebaseProvider,
    private loadingCtrl: LoadingController) {
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
  login(value){
    let loading = this.loadingCtrl.create(
      {
        content:"Signing In"
      }
    );
    loading.present();
    this.db.getData('users').where("matric","==",value.matric).get()
    .then(doc =>{
      if(!doc.empty){
        doc.forEach(item =>{
          let email = item.data().email
          value.email = email
          this.db.login(value)
          .then(()=>{
            loading.dismiss();
            this.navCtrl.setRoot(HomePage);
          })
          .catch((e)=>{
            loading.dismiss();
            alert(e);
          })
        })
      }
      else{
        loading.dismiss();
        alert("matric does not exist")
      }
    })
    .catch((e)=>{
      alert(e);
    });
    
    // this.db.login(value)
    // .then(()=>{
    //   this.navCtrl.setRoot(HomePage);
    // })
    // .catch((e)=>{

    // });
  }

}
