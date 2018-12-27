import { Injectable } from '@angular/core';
import { FirebaseProvider } from '../firebase/firebase';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(private db: FirebaseProvider) {
  }

  getProfile(){
    return this.db.checkAuth()
  }
  

}
