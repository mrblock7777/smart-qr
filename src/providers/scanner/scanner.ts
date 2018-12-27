import { Injectable } from '@angular/core';
import { FirebaseProvider } from '../firebase/firebase';




/*
  Generated class for the ScannerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScannerProvider {

  constructor(private db: FirebaseProvider) {
  }
  // saveData(value){
  //   return this.db.setData('users').doc((String)(new Date())).set(value);
  // }
  saveData(value){
    return this.db.getData('participation').where('email','==',value.email).get()
    .then(doc =>{
      if(!doc.empty){
        doc.forEach(item =>{
          return this.db.setData('participation').doc(item.id).update(
            {
              email: value.email,
              participation: value.participation
            }
          )
        })
      }
    })
    .catch((e)=>{
      alert(e);
    });
  }

  getData(){
    return this.db.getData('users');
  }

}
