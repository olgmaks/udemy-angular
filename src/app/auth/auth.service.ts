import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService
{

  token;

  constructor(private router: Router)
  {
  }

  signUpUser(email: string, password: string)
  {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
                   .catch(error => {
                     console.log(error);
                   });
  }

  signInUser(email: string, password: string)
  {
    firebase.auth().signInWithEmailAndPassword(email, password)
            .then(r => {
              this.router.navigate(['/']);
              console.log(r);
              firebase.auth().currentUser.getToken()
                      .then(t => {
                        this.token = t;
                      });
            })
            .catch(e => console.log(e));


  }

  getToken(): any
  {
    firebase.auth().currentUser.getToken()
            .then(t => {
              this.token = t;
            });
    return this.token;
  }

  isAuthenticated()
  {
    return this.token != null;
  }

  logout()
  {
    firebase.auth().signOut();
    this.token = null;
  }
}
