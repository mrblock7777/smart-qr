import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

// import { Observable } from 'rxjs-compat';
// import { map } from 'rxjs-compat/operators';
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(private db: AngularFirestore,
    private fireAuth: AngularFireAuth) {
  }

  viewData(collection,id){
    return this.db.collection(collection).doc(id).ref.get();
    
  }
  getData(collection){
    return this.db.collection(collection).ref;
  }
  setData(collection){
    return this.db.collection(collection);
  }
  deleteData(collection, id){
    return this.db.collection(collection).doc(id).delete();
  }
  register(value){
    return this.setData('participation').doc((String)(new Date())).set(
      {
        email: value.email,
        participation:[]
      }
    ).then(()=>{
      return this.setData('users').doc((String)(new Date())).set(
        {
          email: value.email,
          matric: value.matric,
          full_name: value.full_name,
          college: value.college,
          faculty: value.faculty,
          merit:
            {
              college_pt: 0,
              faculty_pt: 0,
              university_pt: 0
            },
        }
      )
      .then(()=>{
        return this.fireAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      })
      .catch((e)=>{
        alert(e);
      })
    })
    .catch((e)=>{
      alert(e);
    })
    
  }
  login(value){
    return this.fireAuth.auth.signInWithEmailAndPassword(value.email, value.password);
  }
  logout(){
    this.fireAuth.auth.signOut();
    console.log(this.checkAuth())
  }
  checkAuth(){
    return this.fireAuth.authState;
  }
  getAuth(){
    return this.fireAuth.auth;
  }

}
