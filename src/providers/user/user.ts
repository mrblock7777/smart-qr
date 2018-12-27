import { Injectable } from '@angular/core';
import { FirebaseProvider } from '../firebase/firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(private db: FirebaseProvider) {
  }

  createUser(value){
    return this.db.setData('users').doc((String)(new Date())).set(
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
        participation: []
        
      }
    )
  }
}
